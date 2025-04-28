# GitHub to DeepWiki Jump Script User Guide

<p align="center">
<a href="./README.md"><img alt="README in English" src="https://img.shields.io/badge/English-d9d9d9"></a>
<a href="./README_CN.md"><img alt="简体中文" src="https://img.shields.io/badge/简体中文-d9d9d9"></a>
</p>

This Tampermonkey script adds a DeepWiki link button next to the stars and fork buttons on GitHub repository pages, making it easy for you to jump directly to the corresponding DeepWiki page of the repository.

![DeepWiki Button Preview](./preview.png)

## Installation Steps

### Prerequisites

First, you need to install a user script manager. We recommend Tampermonkey:

- [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- [Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
- [Tampermonkey for Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
- [Tampermonkey for Safari](https://apps.apple.com/app/tampermonkey/id1482490089)

### Method 1: One-Click Installation (Recommended)

1. Make sure you have installed Tampermonkey or another user script manager
2. Click the installation link below:

   [Install GitHub to DeepWiki Jump Script](https://github.com/worryzyy/fast2deepwiki/raw/refs/heads/main/fast2deepwiki.user.js)

3. Tampermonkey will automatically recognize and prompt you to install the script
4. Click the "Install" button to complete the installation

### Method 2: Manual Installation

1. Click [this link](https://github.com/worryzyy/fast2deepwiki/blob/main/fast2deepwiki.user.js) to view the script source code
2. Click the "Raw" button to view the original file
3. Copy all the code
4. Open the Tampermonkey menu (click the Tampermonkey icon in your browser toolbar)
5. Select "Create New Script"
6. Delete the default code in the editor and paste the code you just copied
7. Press Ctrl+S (Command+S on Mac) to save the script

## How to Use

After installation, simply visit any GitHub repository page, and the script will automatically add a "DeepWiki" button next to the stars and fork buttons.

1. Open any GitHub repository page
2. In the action bar at the top of the page (the area containing Watch, Star, Fork), you will see a new "DeepWiki" button
3. Click this button to open the corresponding DeepWiki page of the repository in a new tab

## Features

- Automatically matches the current GitHub repository and generates the corresponding DeepWiki link
- Elegant button design that integrates with the GitHub native interface
- Subtle animation effects and interaction feedback
- Automatically adapts to changes in GitHub page structure
- Supports various repository pages (home, code, Issues, etc.)

## Troubleshooting

If you encounter problems during use:

1. **Button does not appear**

   - Try refreshing the page
   - Check if you are on a GitHub repository page (not a personal profile or other page)
   - Check if the script is enabled in Tampermonkey

2. **Cannot jump after clicking the button**

   - Confirm that the target DeepWiki site is accessible
   - Check your network connection

3. **Script stops working**

   - GitHub may have updated its page structure; check if there is an updated version of the script
   - Try reinstalling the latest version of the script

## Updating the Script

When a new version is released:

1. Revisit the installation link
2. Tampermonkey will prompt you to update the script
3. Click the "Update" button to complete the update

## Feedback and Contribution

If you have any suggestions or find any issues, feel free to provide feedback through the following channels:

- [Submit an Issue](https://github.com/worryzyy/fast2deepwiki/issues)
- [Submit a Pull Request](https://github.com/worryzyy/fast2deepwiki/pulls)

## Privacy Statement

This script does not collect or transmit any personal data. It only runs locally in your browser to add DeepWiki links to GitHub pages.

## License

MIT License

---

Thank you for using the GitHub to DeepWiki Jump Script! We hope it enhances your development experience.
