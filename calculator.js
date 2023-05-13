// Text parameters

// This should be the text used as a placeholder before a selection is made
const baseOptionText = 'Make a selection';

// For the following, the first should always be the one recommended for the 6 day kit
// The second is the one recommended for the 3 day kit
// They must be in this order or the program will index them incorrectly
const cigOptions = ['10+ cigarettes', 'Less than 10 cigarettes'];
const dipOptions = ['2-3+ times of chewing tobacco', 'Less than 2-3 times of chewing tobacco'];
const cigarilloOptions = ['2-3+ cigarillos/cigars', 'Less than 2-3 cigarillos/cigars'];
const vapeOptions = ['1/2+ of a nicotine vaporizer', 'Less than 1/2 of a nicotine vaporizer'];

// Products
// Options may be named whatever, but should remain in the order cigs, dip, cigarillos, vapes
// The position is used to match this name with the usage selection
const products = ['Cigarettes', 'Chewing Tobacco', 'Cigarillos/Cigars', 'Nicotine Vaporizers'];

// These are the code for the two popups
// popup1 is for the 6-day kit
// popup2 is for the 3-day kit
// Replace the link after image to change the image location
// Replace the link after link to change the redirect link
const popup1 = {
    text: "Based on your input, we recommend this kit:",
    image: "",
    link: ""
}
const popup2 = {
    text: "Based on your input, we recommend this kit:",
    image: "https://cdn.shopify.com/s/files/1/0664/8138/9809/products/nico-clean-box-front.jpg",
    link: "https://nicocleandetox.com/products/nicoclean-detox"
}


const getUsageSelection = () => {
    return document.getElementById('nicotine_usage');
}

const getBaseOption = () => {
    const baseOption = document.createElement('option');
    baseOption.innerHTML = baseOptionText;
    return baseOption;
}


const generateProducts = () => {
    let options = [];
    options.push(getBaseOption());
    // let base = docum baseent.createElement('option');
    // base.innerText =OptionText;
    // options.push(base);
    for (var text of products) {
        let option = document.createElement('option');
        option.innerHTML = text;
        options.push(option);
    }

    const product_selection = document.getElementById('nicotine_product');
    while(product_selection.firstChild) {
        product_selection.removeChild(product_selection.firstChild);
    }
    for (var option of options) {
        product_selection.appendChild(option);
    }
}

const closeSpan = document.createElement('p');
closeSpan.classList.add('right_align');
const closeAnchor = document.createElement('a');
closeAnchor.innerText = "x";
closeAnchor.addEventListener('click', (e) => {
    hidePopup();
});
closeSpan.appendChild(closeAnchor);

const generatePopupContent = (data) => {
    // Create text
    const text = document.createElement('p');
    // Set text
    text.innerText = data.text;
    text.classList.add('nicotine_text_center');
    // Create image
    const image = document.createElement('img');
    image.setAttribute('src', data.image);
    image.classList.add('nicotine_popup_image');
    // Generate an anchor for the image
    const anchor = document.createElement('a');
    anchor.appendChild(image);
    anchor.setAttribute('href', data.link);
    
    const goButton = document.createElement('button');
    goButton.classList.add('nicotine_button');
    goButton.innerText = "Take me there";
    goButton.addEventListener('click', (e) => {
        window.location = data.link;
    });
    const closeButton = document.createElement('close');
    closeButton.classList.add('nicotine_button');
    closeButton.innerText = "Close";
    closeButton.addEventListener('click', hidePopup);
    
    const buttonDiv = document.createElement('div');
    buttonDiv.appendChild(goButton);
    buttonDiv.appendChild(closeButton);
    buttonDiv.classList.add('nicotine_row');
    
    const div = document.createElement('div');
    div.appendChild(text);
    div.appendChild(anchor);
    div.appendChild(buttonDiv);

    // Remove all existing children
    const popup_content = document.getElementById('nicotine_popup_content');
    while (popup_content.firstChild) popup_content.removeChild(popup_content.firstChild);
    // Add new div
    popup_content.appendChild(div);
}

const generateOptions = (options) => {
    for (var i = 0; i < options.length; i++) {
        var text = options[i];
        options[i] = document.createElement('option');
        options[i].innerHTML = text;
    }

    options.unshift(getBaseOption());

    const usage_selection = getUsageSelection();
    while (usage_selection.firstChild) {
        usage_selection.removeChild(usage_selection.firstChild);
    }
    for (var option of options) {
        usage_selection.appendChild(option);
    }
}

const hidePopup = () => {
    const popup = document.getElementById('nicotine_popup_wrapper');
    popup.classList.add('hidden');
}

const showPopup = () => {
    const popup = document.getElementById('nicotine_popup_wrapper');
    popup.classList.remove('hidden');
}

const main = () => {
    const product_select = document.getElementById('nicotine_product');
    const usage_select = getUsageSelection();
    const submit_button = document.getElementById('nicotine_results_button');

    usage_select.setAttribute('disabled', 'disabled');
    submit_button.setAttribute('disabled', 'disabled');

    generateProducts();
    generateOptions([]);

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape') {
            const popup = document.getElementById('nicotine_popup_wrapper');
            if (!popup.classList.contains('hidden')) {
                popup.classList.add('hidden');
            }
        }
    });

    product_select.addEventListener('change', (e) => {
        // Get product
        var index = product_select.selectedIndex;
        switch (index) {
            case 1:
                generateOptions(cigOptions);
                break;
            case 2:
                generateOptions(dipOptions);
                break;
            case 3:
                generateOptions(cigarilloOptions);
                break;
            case 4:
                generateOptions(vapeOptions);
                break;
            default:
                generateOptions([]);
                break;
        }
        if (index > 0) {
            usage_select.removeAttribute('disabled');
        } else {
            usage_select.setAttribute('disabled', 'disabled');
        }
    });

    usage_select.addEventListener('change', (e) => {
        var index = usage_select.selectedIndex;

        if (index > 0) {
            submit_button.removeAttribute('disabled');
        } else {
            submit_button.setAttribute('disabled', 'disabled');
        }
    });

    submit_button.addEventListener('click', (e) => {
        // Get popup index
        var index = usage_select.selectedIndex;
        if (index == 1) {
            generatePopupContent(popup1);
            showPopup();
        } else if (index == 2) {
            generatePopupContent(popup2);
            showPopup();
        }
    });

    const popup = document.getElementById('nicotine_popup_wrapper');
    popup.addEventListener('click', (e) => {
        hidePopup();
    });

    const popup_content = document.getElementById('nicotine_popup_content');
    popup_content.addEventListener('click', (e) => {
        e.stopPropagation();
    });
};

main();