module.exports = {
    /**
     * Makes the selected text bold
     */
    makeSelectedBold: () => document.execCommand('bold'),

    /**
     * Makes the selected text underlined
     */
    makeSelectedUnderline: () => document.execCommand('underline'),

    /**
     * Makes the selected text italic
     */
    makeSelectedItalics: () => document.execCommand('italic'),
}
