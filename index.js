// Array to store opened popups
const openedPopups = [];

// Function to close a window
function closeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.style.display = 'none';
    // Remove the closed window from the array
    openedPopups.splice(openedPopups.indexOf(windowElement), 1);
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

    // Check if the popup is already open
    const popupElement = document.getElementById("popup-" + id);
    const isOpen = openedPopups.includes(popupElement);

    if (isOpen) {
        // Popup is already open, close or minimize it
        toggleMinimizeWindow("popup-" + id);
    } else {
        // Popup is not open, show it
        openedPopups.push(popupElement);

        // Hide other opened popups
        /*
        openedPopups.forEach((popup) => {
            if (popup !== popupElement) {
                popup.style.display = 'none';
            }
        });
        */

        // Show the newly opened popup
        popupElement.style.display = 'block';
        // make the popup draggable with bar for both vertical and horizontal dragging, and resizable
        makeDraggableWithBar(popupElement);

        // Activate the close button for the opened popup
        const closeButton = popupElement.querySelector('.close-button');
        closeButton.addEventListener('click', function () {
            closeWindow(popupElement.id);
        });

        // Activate the resize handles for the opened popup
        makeResizable(popupElement);
    }
});

// Function to make an element draggable with a drag bar for both vertical and horizontal dragging
function makeDraggableWithBar(element) {
    let isDragging = false;
    let offsetX, offsetY;

    const dragBar = element.querySelector('.drag-bar');

    dragBar.addEventListener('mousedown', (e) => {
        const closeButton = element.querySelector('.close-button');

        // Check if the click is on the close button
        if (!closeButton.contains(e.target)) {
            isDragging = true;
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;

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
        isDragging = false;
    });
}

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
            //marginLeft = parseInt(element.style.left);
            marginTop = parseInt(element.style.top);

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

document.addEventListener('DOMContentLoaded', function () {
    // Set the form to be visible by default
    var formContainer = document.getElementById('contactForm');
    formContainer.style.display = 'block';
  
    // Toggle form visibility on button click
    // document.getElementById('toggleFormButton').addEventListener('click', function () {
    //   formContainer.style.display = (formContainer.style.display === 'none' || formContainer.style.display === '') ? 'block' : 'none';
    // });
  
    // Handle form submission
    document.getElementById('myForm').addEventListener('submit', function (event) {
      event.preventDefault();
      // You can add logic here to handle the form submission
      // For now, let's just display an alert
      alert('Thank you for sharing! \u2665' );
    });
  });
