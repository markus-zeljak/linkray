# Linkray

Create linked String, Value and Color Arrays in Cavalry with one click.

**Version:** 1.0.1 · **Cavalry target:** 2.8.0

## Features

- Create an array of the same type with matching entry links.
- Keep the original as a clearly labelled master.
- Update connected values by editing the master.

## Install

1. Download [`Linkray.js`](https://github.com/markus-zeljak/linkray/releases/latest/download/Linkray.js).
2. In Cavalry, choose **Scripts → Show Scripts Folder**.
3. Copy `Linkray.js` into that folder.
4. Open **Scripts → Linkray**.

To update, replace the file, then close and reopen the panel.

**Scripts** may be under **Window** in some versions; **Show Scripts Folder** may also appear under **Help**. See [Cavalry's installation guide](https://cavalry.studio/docs/tech-info/scripting/script-uis/).

## Use

1. Select exactly one **String Array**, **Value Array** or **Color Array**.
2. Click **Create Linked Array**.
3. Edit the master array to update the connected values.

The original gets a **[MASTER]** suffix and a blue label. The new array gets a silver label and is selected for you. Bracket tags are removed from its name; meaningful numbers are kept.

## Notes

- The new array starts with the same number of entries, including zero.
- Linked arrays do not automatically resize when master entries are added or removed.
- No extra software or assets are required.
- Right-click the panel to see the version. Errors appear in Cavalry's JavaScript Console.

## Credits

I did not write any of the code. All code was generated with OpenAI Codex from my prompts and feedback.

Linkray is my original idea; it was not inspired by another tool.

## Feedback

Found a problem? [Open an issue](https://github.com/markus-zeljak/linkray/issues/new?template=bug_report.yml) with your tool version, Cavalry version, operating system and steps to reproduce.

## License

[MIT](LICENSE). Free to use, modify and share.
