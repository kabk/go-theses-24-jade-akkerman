$(document).ready(function() {
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

    // Activate the navigation links
    $(".menu-item").click(function () {
        // get the id of the clicked menu item
        var id = $(this).attr('id');
        // use it to open, close, or minimize the connected popup

        // Show the newly opened popup
        const popupElement = document.getElementById("popup-" + id);
        popupElement.style.display = 'block';
        // Set the z-index of the popup to be the highest among all popups plus 1
        const highestZIndex = Math.max(...Array.from(document.querySelectorAll('.popup')).map(popup => parseInt(window.getComputedStyle(popup).zIndex) || 0), 0);
        popupElement.style.zIndex = highestZIndex + 1;

        // make the popup draggable with bar for both vertical and horizontal dragging, and resizable
        makeDraggableWithBar(popupElement);

        // Activate the close button for the opened popup
        const closeButton = popupElement.querySelector('.close-button');
        closeButton.addEventListener('click', function () {
            closeWindow(popupElement.id);
        });

        // Activate the resize handles for the opened popup
        makeResizable(popupElement);
    });



    function makeDraggableWithBar(element) {
        let isDragging = false;
        let offsetX, offsetY;
    
        const dragBar = element.querySelector('.drag-bar');
    
        dragBar.addEventListener('mousedown', (e) => {
            const closeButton = element.querySelector('.close-button');
    
            // Check if the click is on the close button
            if (!closeButton.contains(e.target)) {
                isDragging = true;
    
                // Bring the current popup to the front
                const highestZIndex = Math.max(...Array.from(document.querySelectorAll('.popup')).map(popup => parseInt(window.getComputedStyle(popup).zIndex) || 0), 0);
                element.style.zIndex = highestZIndex + 1;
    
                offsetX = e.clientX - element.getBoundingClientRect().left;
                offsetY = e.clientY - element.getBoundingClientRect().top;
    
                // Set the grabbing cursor when dragging starts
                dragBar.style.cursor = '-webkit-grabbing';
    
                // Prevent default behavior to avoid selecting text during dragging
                e.preventDefault();
            }
        });
    
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const x = e.clientX - offsetX;
                const y = e.clientY - offsetY;
    
                element.style.left = `${x}px`;
                element.style.top = `${y}px`;
            }
        });
    
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
    
                // Revert back to default cursor when dragging ends
                dragBar.style.cursor = '-webkit-grab';
            }
        });
    }
    
    

    $(".popup").click(function () {
        const clickedPopup = this;
    
        // Bring the clicked popup to the front
        const highestZIndex = Math.max(...Array.from(document.querySelectorAll('.popup')).map(popup => parseInt(window.getComputedStyle(popup).zIndex) || 0), 0);
        clickedPopup.style.zIndex = highestZIndex + 1;
    });
    

    

    // Function to make an element resizable
    function makeResizable(element) {
        const resizeHandles = element.querySelectorAll('.resize-handle');
        let isResizing = false;
        let originalWidth, originalHeight;

        resizeHandles.forEach((handle) => {
            handle.addEventListener('mousedown', (e) => {
                isResizing = true;
                originalWidth = element.offsetWidth;
                originalHeight = element.offsetHeight;
                marginLeft = (element.getBoundingClientRect().left);
                marginTop = (element.getBoundingClientRect().top);

                // Prevent default behavior to avoid interference with dragging
                e.preventDefault();
            });
        });

        document.addEventListener('mousemove', (e) => {
            if (isResizing) {
                const newWidth = originalWidth + e.clientX - originalWidth - marginLeft;
                const newHeight = originalHeight + e.clientY - originalHeight - marginTop;

                resizeWindow(element, newWidth, newHeight);
            }
        });

        document.addEventListener('mouseup', () => {
            isResizing = false;
        });
    }

    // Set the form to be visible by default
    var formContainer = document.getElementById('contactForm');
    formContainer.style.display = 'block';
  
    // Handle form submission
    document.getElementById('myForm').addEventListener('submit', function (event) {
        event.preventDefault();
        // You can add logic here to handle the form submission
        // For now, let's just display an alert
        alert('Thank you for sharing! \u2665' );
    });
});
