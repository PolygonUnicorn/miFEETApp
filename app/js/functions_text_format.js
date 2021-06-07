const format = module.exports = {
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
};

/**
 * Reset the formatting after pressing an enter key
 */
document.addEventListener('keypress', ev => {
    if (ev.key === 'Enter') {
        if (document.queryCommandState('bold')) format.makeBold();
        if (document.queryCommandState('underline')) format.makeUnderline();
        if (document.queryCommandState('italic')) format.makeItalics();
    }
});

/**
 *  Marks the formatting buttons if that formatting is active at the cursor position
 */
function handleInput() {
    const boldButton = document.getElementById('boldButton');
    const underlineButton = document.getElementById('underlineButton');
    const italicButton = document.getElementById('italicButton');

    if (document.queryCommandState('bold')) boldButton.classList.add('active');
    else boldButton.classList.remove('active');
    if (document.queryCommandState('underline')) underlineButton.classList.add('active');
    else underlineButton.classList.remove('active');
    if (document.queryCommandState('italic')) italicButton.classList.add('active');
    else italicButton.classList.remove('active');
}

setInterval(() => {
    handleInput();
    document.getElementById('editor').focus();
});
