const fileInput = document.querySelector('.file-input'),
filteroptions = document.querySelectorAll('.filter button'),
filterName = document.querySelector('.filter-info .name'),
filterSlider = document.querySelector('.slider input'),
filterValue = document.querySelector('.filter-info .value'),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector('.preview-img img'),
chooseImgBtn = document.querySelector('.choose-img'),
resetFilterBtn = document.querySelector(".reset-filter"),
saveImgBtn = document.querySelector('.save-img');

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0; 
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilters = () =>{
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%)  invert(${inversion}%) grayscale(${grayscale}%)`;
}

const loadImage = () =>{
    let file = fileInput.files[0]; //getting user selected file
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);

    previewImg.addEventListener("load", ()=>{
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
    });
}

filteroptions.forEach(option =>{
    option.addEventListener('click', ()=>{
        document.querySelector('.filter .active').classList.remove('active');
        option.classList.add('active');
        filterName.textContent = option.textContent;

        if(option.id === 'brightness'){
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        }
        else if(option.id === 'saturation'){
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        }
        else if(option.id === 'inversion'){
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        }
        else{
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
            
        }
    });
});

const updateFilter = () =>{
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector('.filter .active');

    if(selectedFilter.id === 'brightness'){
        brightness = filterSlider.value;
    } else if (selectedFilter.id === 'saturation'){
        saturation = filterSlider.value;
    } else if (selectedFilter.id === 'inversion'){
        inversion = filterSlider.value;
    }else{
        grayscale = filterSlider.value;
    }

    applyFilters();
}

rotateOptions.forEach(option =>{
    option.addEventListener('click', ()=>{
        if(option.id == 'left'){
            rotate -= 90;
        }
        else if(option.id == 'right'){
            rotate += 90;
        }
        else if(option.id === 'horizontal'){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        }
        else{
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilters();
    });
});

const resetFilter = () =>{
    // Resetting all variable values to its default value
    brightness = 100; saturation = 100; inversion = 0; grayscale = 0;
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filteroptions[0].click();
    applyFilters();
}

const saveImage = () =>{
    const canvas = document.createElement("canvas"); //creating canvas element
    const ctx = canvas.getContext("2d"); //canvas.getContext return a drawing context on the canvas;

    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    // applying user selected filters to canvas filter
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2); //translating canvas from center

    // if rotate value isn't 0, rotate the canvas
    if(rotate !== 0){
        ctx.rotate(rotate * Math.PI / 180);
    }

    ctx.scale(flipHorizontal, flipVertical); //flip canvas, horizontally / vertically
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const link = document.createElement("a"); //creating <a> element
    link.download = "image.jpg"; // passing
    link.href = canvas.toDataURL();
    link.click();

}

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener('click', saveImage);


chooseImgBtn.addEventListener("click", ()=>{
    fileInput.click();
})
