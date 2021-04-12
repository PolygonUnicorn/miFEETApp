module.exports = {
    /**
     * Makes the selected text bold
     */
    makeBold: () => document.execCommand('bold'),

    /**
     * Makes the selected text underlined
     */
    makeUnderline: () => document.execCommand('underline'),

    /**
     * Makes the selected text italic
     */
    makeItalics: () => document.execCommand('italic'),

    /**
     * Align text left
     */
    justifyLeft: () => document.execCommand('justifyLeft'),

    /**
     * Align text center
     */
    justifyCenter: () => document.execCommand('justifyCenter'),

    /**
     * Align text right
     */
    justifyRight: () => document.execCommand('justifyRight'),
}
