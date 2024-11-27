// script.js
 deviceType = "";
let initialX = 0,
    initialY = 0;
let currentElement = "";
let moveElement = false;

//Detect touch device
const isTouchDevice = () => {
    try {
        //We try to create Touch Event (It would fail for desktops and throw error)
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

//For touchscreen movement
const touchMove = (e) => {
    if (moveElement) {
        e.preventDefault();
        let newX = e.touches[0].clientX;
        let newY = e.touches[0].clientY;
        let currentSelectedElement = document.getElementById(e.target.id);
        currentSelectedElement.parentElement.style.top =
            currentSelectedElement.parentElement.offsetTop - (initialY - newY) + "px";
        currentSelectedElement.parentElement.style.left =
            currentSelectedElement.parentElement.offsetLeft -
            (initialX - newX) +
            "px";
        initialX = newX;
        initialY - newY;
    }
};

const drop = (e) => {
    e.preventDefault();
    //For touch screen
    if (isTouchDevice()) {
        moveElement = false;
        //Select country name div using the custom attribute
        const currentDrop = document.querySelector(`div[data-id='${e.target.id}']`);
        //Get boundaries of div
        const currentDropBound = currentDrop.getBoundingClientRect();
        //if the position of flag falls inside the bounds of the countru name
        if (
            initialX >= currentDropBound.left &&
            initialX <= currentDropBound.right &&
            initialY >= currentDropBound.top &&
            initialY <= currentDropBound.bottom
        ) {
            currentDrop.classList.add("dropped");
            //hide actual image
            currentElement.classList.add("hide");
            currentDrop.innerHTML = ``;

        }
    } else {
        //Access data
        const draggedElementData = e.dataTransfer.getData("text");
        //Get custom attribute value
        const droppableElementData = e.target.getAttribute("data-id");
        if (draggedElementData === droppableElementData) {
            const draggedElement = document.getElementById(draggedElementData);
            //dropped class
            e.target.classList.add("dropped");
            //hide current img
            draggedElement.classList.add("hide");
            //draggable set to false
        }
    }
};



document.addEventListener('DOMContentLoaded', (event) => {
    const bins = document.querySelectorAll('.bin');

    const trash1 = document.getElementById('trash1');
    trash1.addEventListener('touchstart', dragStart);
    trash1.addEventListener('touchend', drop);
    trash1.addEventListener('touchmove', touchMove);

    trash1.addEventListener('dragstart', dragStart);
    trash1.addEventListener('dragend', dragEnd);

    const trash2 = document.getElementById('trash2');
    trash2.addEventListener('dragstart', dragStart);
    trash2.addEventListener('dragend', dragEnd);

    const trash3 = document.getElementById('trash3');
    trash3.addEventListener('dragstart', dragStart);
    trash3.addEventListener('dragend', dragEnd);

    const trash4 = document.getElementById('trash4');
    trash4.addEventListener('dragstart', dragStart);
    trash4.addEventListener('dragend', dragEnd);

    bins.forEach(bin => {
        bin.addEventListener('dragover', dragOver);
        bin.addEventListener('drop', drop);
    });



    function dragStart(e) {
        if (isTouchDevice()) {
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
            //Start movement for touch
            moveElement = true;
            currentElement = e.target;
        } else {
            e.dataTransfer.setData('text/plain', e.target.id);
            setTimeout(() => {
                e.target.classList.add('hide');
            }, 0);
        }
    }

    function dragEnd(e) {
        e.target.classList.remove('hide');
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        e.target.classList.add('hovered');
    }

    function dragLeave(e) {
        e.target.classList.remove('hovered');
    }

    function dragDrop(e) {
        e.preventDefault();

        const id = e.dataTransfer.getData('text/plain');
        const trashItem = document.getElementById(id);
        const binType = e.target.getAttribute('data-type');
        const trashType = trashItem.getAttribute('data-type');

        e.target.classList.remove('hovered');

        if (binType === trashType) {
            alert('¡Correcto!');
            trashItem.remove();

            // Aquí puedes agregar lógica para mostrar un nuevo desecho.
        } else {
            alert('¡Intenta de nuevo!');
        }

    }
});
