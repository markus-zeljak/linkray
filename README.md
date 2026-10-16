# Linkray

Create a linked copy of a String, Value, or Color Array in Cavalry with one click.

**Version:** 1.0.1 · Layer types checked against Cavalry 2.8.0.

## Install

1. Download [`Linkray.js`](https://github.com/markus-zeljak/linkray/releases/latest/download/Linkray.js).
2. In Cavalry, open **Help → Show Scripts Folder** and copy the file there.
3. Open **Scripts → Linkray**. Close and reopen the panel after an update.

| Windows | macOS |
| --- | --- |
| `%APPDATA%\Cavalry\Scripts` | `~/Library/Application Support/Cavalry/Scripts` |

No extra software or assets are required.

## Use

1. Select exactly one **String Array**, **Value Array**, or **Color Array**.
2. Click **Create Linked Array**.
3. Edit the original array to update the connected values.

Linkray creates an array of the same type and connects each entry to the matching master entry. The original gets a **[MASTER]** suffix and a blue label; the new array gets a silver label and is selected for you. Bracket tags are removed from the new array's name; meaningful numbers are kept.

The new array starts with the same number of entries, including zero. Existing linked arrays do not automatically resize when entries are added or removed from the master.

Right-click the panel to see the version. Errors appear in Cavalry's JavaScript Console.

## Credits & transparency

Linkray is my original idea; it was not inspired by another tool.

I did not write any of the code. All code was generated with OpenAI Codex from my prompts and feedback.

## Feedback

Found a problem? [Open an issue](https://github.com/markus-zeljak/linkray/issues/new?template=bug_report.yml) with your Cavalry version, array type, and a small example.

## License

[MIT](LICENSE). Free to use, modify and share.
