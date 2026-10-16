/* Linkray — 1.0.1
 * Cavalry editor/UI script. Editable, self-contained; no runtime assets.
 * api signatures: https://cavalry.studio/docs/tech-info/scripting/api-module/
 * UI: https://cavalry.studio/docs/tech-info/scripting/script-uis/
 * Layer types verified against Cavalry 2.8.0 nodeDefinitions.json.
 * colorId values follow the user's Gradient Stroke script: 9 cornflower blue, 16 silver.
 */
var Linkray = (function () {
    "use strict";
    var VERSION = "1.0.1";
    var TYPES = {stringArray: true, valueArray: true, colorArray: true};

    function selectionPlan() {
        var selection = api.getSelection();
        if (selection.length !== 1) {
            throw new Error("Select one String, Value, or Color Array.");
        }
        var id = selection[0];
        if (!api.layerExists(id) || !TYPES[api.getLayerType(id)]) {
            throw new Error("Select a String, Value, or Color Array.");
        }
        var count = api.getArrayCount(id, "array");
        if (!isFinite(count) || count < 0 || Math.floor(count) !== count) {
            throw new Error("The selected array has an invalid entry count.");
        }
        for (var index = 0; index < count; index++) {
            if (!api.hasAttribute(id, "array." + index)) {
                throw new Error("The selected array has an unavailable index: " + index + ".");
            }
        }
        var name = api.getNiceName(id);
        // Only strip tags; existing meaningful numbers in the name remain intact.
        var baseName = name.replace(/\s*\[[^\]]*\]/g, "").trim();
        if (!baseName) baseName = "Array";
        return {
            id: id,
            type: api.getLayerType(id),
            count: count,
            originalName: name,
            originalColor: api.get(id, "colorId"),
            masterName: name.replace(/(?:\s*\[MASTER\])+$/gi, "") + " [MASTER]",
            linkedName: baseName
        };
    }

    function createLinkedArray() {
        // Resolve and validate the current selection before any scene writes.
        var plan = selectionPlan();
        var linkedId = null;
        try {
            // Free the original name before creating the linked array.
            api.rename(plan.id, plan.masterName);
            linkedId = api.create(plan.type, plan.linkedName, false);
            if (!linkedId || !api.layerExists(linkedId)) {
                throw new Error("Cavalry could not create the linked array.");
            }
            // Use the real default count, including a genuinely empty source.
            var defaults = api.getArrayCount(linkedId, "array");
            for (var oldIndex = defaults - 1; oldIndex >= 0; oldIndex--) {
                api.removeArrayIndex(linkedId, "array." + oldIndex);
            }
            for (var index = 0; index < plan.count; index++) {
                api.addArrayIndex(linkedId, "array");
                var attribute = "array." + index;
                if (!api.hasAttribute(linkedId, attribute)) {
                    throw new Error("Cavalry could not create array index " + index + ".");
                }
                api.connect(plan.id, attribute, linkedId, attribute, false);
                var input = api.getInConnection(linkedId, attribute);
                var inputs = api.getInConnectedAttributes(linkedId);
                if (input !== plan.id + "." + attribute &&
                    inputs.indexOf(attribute) < 0 && inputs.indexOf(linkedId + "." + attribute) < 0) {
                    throw new Error("Cavalry did not accept the connection for index " + index + ".");
                }
            }
            if (api.getArrayCount(linkedId, "array") !== plan.count) {
                throw new Error("The linked array's entry count does not match the master.");
            }
            // Explicitly rename so Cavalry's automatic create suffix is removed.
            api.rename(linkedId, plan.linkedName);
            api.set(plan.id, {colorId: 9});
            api.set(linkedId, {colorId: 16});
            if (api.getNiceName(linkedId) !== plan.linkedName ||
                api.getNiceName(plan.id) !== plan.masterName ||
                api.get(plan.id, "colorId") !== 9 || api.get(linkedId, "colorId") !== 16) {
                throw new Error("Cavalry could not assign the requested array names.");
            }
            api.select([linkedId]);
            return {master: plan.id, linked: linkedId, count: plan.count};
        } catch (error) {
            // Roll back this operation only; never change source entries or inputs.
            var cleanupErrors = [];
            if (linkedId && api.layerExists(linkedId)) {
                try { api.deleteLayer(linkedId); } catch (removeError) { cleanupErrors.push(String(removeError)); }
            }
            try {
                api.rename(plan.id, plan.originalName);
                api.set(plan.id, {colorId: plan.originalColor});
                api.select([plan.id]);
            } catch (restoreError) { cleanupErrors.push(String(restoreError)); }
            if (cleanupErrors.length) {
                throw new Error(String(error) + " Cleanup needs attention: " + cleanupErrors.join("; "));
            }
            throw error;
        }
    }

    function buildUI() {
        ui.setTitle("Linkray");
        ui.setMargins(6, 6, 6, 6);
        var button = new ui.Button("Create Linked Array");
        button.setToolTip("Select one String, Value, or Color Array. Creates a matching array linked index by index.");
        button.onClick = function () {
            try { createLinkedArray(); }
            catch (error) { console.warn("Linkray: " + String(error)); }
        };
        ui.add(button);
        // Version is visible only when the panel's context menu is opened.
        ui.addMenuItem({name: "Linkray v" + VERSION, enabled: false});
        ui.showContextMenuOnRightClick();
        ui.show();
    }

    return {version: VERSION, createLinkedArray: createLinkedArray, buildUI: buildUI};
})();
Linkray.buildUI();
