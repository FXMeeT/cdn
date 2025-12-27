(function () {
    if (window.location.hostname === 'chatgpt.com') {

        // Function to enable and click the submit button
        function enableAndClickButton() {
            const button = document.getElementById('composer-submit-button');
            if (!button) return;

            // Force enable
            if (button.hasAttribute('disabled')) {
                button.removeAttribute('disabled');
                console.log('Submit button enabled!');
            }

            // Click the button
            button.click();
            console.log('Submit button clicked!');
        }

        // Function to attach listeners to the textarea
        function attachListener() {
            const textarea = document.getElementById('prompt-textarea');
            if (!textarea || textarea.dataset.listenerAttached) return;

            // Enable button on input
            textarea.addEventListener('input', () => {
                const button = document.getElementById('composer-submit-button');
                if (button && button.hasAttribute('disabled')) {
                    button.removeAttribute('disabled');
                }
            });

            // Trigger button on Enter key (without Shift)
            textarea.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault(); // prevent newline
                    enableAndClickButton();
                }
            });

            textarea.dataset.listenerAttached = 'true';
            console.log('Listeners attached to textarea.');
        }

        // Function to check if the "New Chat" button exists
        function checkNewChatButton() {
            const newChatButton = Array.from(
                document.querySelectorAll('button.btn.btn-primary')
            ).find(btn => btn.textContent.trim() === 'New chat');
            return !!newChatButton;
        }

        // Observe DOM changes to detect "New Chat" button dynamically
        const observer = new MutationObserver(() => {
            if (checkNewChatButton()) {
                console.log('New Chat button detected. Activating script...');
                attachListener();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Also check immediately in case it already exists
        if (checkNewChatButton()) {
            console.log('New Chat button already exists. Activating script...');
            attachListener();
        }
    }
})();
