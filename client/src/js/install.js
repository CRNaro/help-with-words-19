const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// √ TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.removeAttribute('hidden');
});

// √ TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    // Show the install prompt
    promptEvent.prompt();
    // Wait for the user to respond to the prompt
    const choiceResult = await promptEvent.userChoice;
    if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
    } else {
        console.log('User dismissed the install prompt');
    }
    window.deferredPrompt = null;
    butInstall.toggleAttribute('hidden', true);
});

// √ TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
