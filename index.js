




$(document).ready(function () {
    // Function to close a window
    function closeWindow(windowId) {
        const windowElement = document.getElementById(windowId);
        windowElement.style.display = 'none';
    }

    // Function to minimize or restore a window
    function toggleMinimizeWindow(windowId) {
        const windowElement = document.getElementById(windowId);
        const isVisible = windowElement.style.display !== 'none';

        if (isVisible) {
            // Window is currently visible, minimize it
            windowElement.style.display = 'none';
        } else {
            // Window is currently hidden, restore it
            windowElement.style.display = 'block';
        }
    }



    // Function to resize a window
    function resizeWindow(element, newWidth, newHeight) {
        // Set a minimum size for the popup
        const minWidth = 200;
        const minHeight = 150;

        element.style.width = `${Math.max(minWidth, newWidth)}px`;
        element.style.height = `${Math.max(minHeight, newHeight)}px`;
    }

    // Function to make an element draggable with a drag bar
    function makeDraggableWithBar(element) {
        const dragBar = element.querySelector('.drag-bar');

        dragBar.addEventListener('mouseenter', () => {
            dragBar.style.cursor = '-webkit-grab';
        });

        dragBar.addEventListener('mousedown', (e) => {
            const closeButton = element.querySelector('.close-button');

            // Check if the click is on the close button
            if (!closeButton.contains(e.target)) {
                // Bring the current popup to the front
                const highestZIndex = Math.max(...Array.from(document.querySelectorAll('.popup')).map(popup => parseInt(window.getComputedStyle(popup).zIndex) || 0), 0);
                element.style.zIndex = highestZIndex + 1;

                const offsetX = e.clientX - element.getBoundingClientRect().left;
                const offsetY = e.clientY - element.getBoundingClientRect().top;

                // Set the grabbing cursor when dragging starts
                dragBar.style.cursor = '-webkit-grabbing';

                // Function to handle dragging
                function handleDrag(e) {
                    const x = e.clientX - offsetX;
                    const y = e.clientY - offsetY;

                    element.style.left = `${x}px`;
                    element.style.top = `${y}px`;
                }

                // Function to stop dragging
                function stopDrag() {
                    document.removeEventListener('mousemove', handleDrag);
                    document.removeEventListener('mouseup', stopDrag);
                    // Revert back to default cursor when dragging ends
                    dragBar.style.cursor = '-webkit-grab';
                }

                // Add event listeners for dragging
                document.addEventListener('mousemove', handleDrag);
                document.addEventListener('mouseup', stopDrag);

                // Prevent default behavior to avoid selecting text during dragging
                e.preventDefault();
            }
        });
    }

    // Function to make an element resizable
    function makeResizable(element) {
        const resizeHandles = element.querySelectorAll('.resize-handle');

        resizeHandles.forEach((handle) => {
            handle.addEventListener('mouseenter', () => {
                handle.style.cursor = 'nwse-resize';
            });

            handle.addEventListener('mousedown', (e) => {
                const originalWidth = element.offsetWidth;
                const originalHeight = element.offsetHeight;
                const marginLeft = element.getBoundingClientRect().left;
                const marginTop = element.getBoundingClientRect().top;

                // Function to handle resizing
                function handleResize(e) {
                    const newWidth = originalWidth + e.clientX - originalWidth - marginLeft;
                    const newHeight = originalHeight + e.clientY - originalHeight - marginTop;

                    resizeWindow(element, newWidth, newHeight);
                }

                // Function to stop resizing
                function stopResize() {
                    document.removeEventListener('mousemove', handleResize);
                    document.removeEventListener('mouseup', stopResize);
                }

                // Add event listeners for resizing
                document.addEventListener('mousemove', handleResize);
                document.addEventListener('mouseup', stopResize);

                // Prevent default behavior to avoid interference with dragging
                e.preventDefault();
            });
        });
    }

 // Activate the navigation links
$(".menu-item").mouseenter(function () {
    // Change cursor to pointer when mouse enters menu item area
    $(this).css('cursor', 'pointer');
});

// Function to handle popup setup
function setupPopup(popupElement) {
    // Set the z-index of the popup to be the highest among all popups plus 1
    const highestZIndex = Math.max(...Array.from(document.querySelectorAll('.popup')).map(popup => parseInt(window.getComputedStyle(popup).zIndex) || 0), 0);
    popupElement.style.zIndex = highestZIndex + 1;

    // Make the popup draggable with bar for both vertical and horizontal dragging
    makeDraggableWithBar(popupElement);

    // Activate the close button for the popup
    const closeButton = popupElement.querySelector('.close-button');
    closeButton.addEventListener('click', function () {
        closeWindow(popupElement.id);
    });

    // Make the popup resizable
    makeResizable(popupElement);
}

// Activate the navigation links
$(".menu-item").mouseenter(function () {
    // Change cursor to pointer when mouse enters menu item area
    $(this).css('cursor', 'pointer');
});

$(".menu-item").click(function () {
    // Check if the clicked menu item is the one that requires a password
    if ($(this).attr('id') === "keepout") {
        // Prompt for password
        var password = prompt("Enter your name:");
        
        // Display the "keepout" popup
        const popupElement = document.getElementById("popup-keepout");
        popupElement.style.display = 'block';

        // Set up the "keepout" popup
        setupPopup(popupElement);
    } else {
        // get the id of the clicked menu item
        var id = $(this).attr('id');
        // use it to open, close, or minimize the connected popup

        // Check if the popup is already open
        const popupElement = document.getElementById("popup-" + id);
        if (popupElement.style.display === 'block') {
            // If already open, bring it to the front
            const highestZIndex = Math.max(...Array.from(document.querySelectorAll('.popup')).map(popup => parseInt(window.getComputedStyle(popup).zIndex) || 0), 0);
            popupElement.style.zIndex = highestZIndex + 1;
        } else {
            // Show the newly opened popup
            popupElement.style.display = 'block';

            // Set up the opened popup
            setupPopup(popupElement);
        }
    }
});


    // Function to handle window resizing for smaller screens
    function handleWindowResize() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 779) {
            // For smaller screens, close all popups except the first one
            const popups = document.querySelectorAll('.popup');
            for (let i = 1; i < popups.length; i++) {
                popups[i].style.display = 'none';
            }
        }
    }

    // Call handleWindowResize initially and on window resize
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

    // Set the form to be visible by default
    var formContainer = document.getElementById('contactForm');
    formContainer.style.display = 'block';

    // Handle form submission
    document.getElementById('myForm').addEventListener('submit', function (event) {
        event.preventDefault()
        .then(response => {
            alert('Thank you for sharing! \u2665');

        })
        .catch(console => console.error('Error!', error.message))
    });

});

