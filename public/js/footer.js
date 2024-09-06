const footerNav = document.getElementById("footer_nav");
const descTitles = document.getElementsByTagName("dt");
let currentList;
function AssignEventToDescriptionTitles ()
{
    for (let index = 0; index < descTitles.length; index++) {
        
        let descTitle = descTitles[index];
        descTitle.onclick =  function(event)
        {
            if(currentList != descTitle && currentList != undefined)
                ToggleDescDetails(currentList);

            ToggleDescDetails(descTitle);
        }
    }
}

AssignEventToDescriptionTitles();

function ToggleDescDetails (element)
{
    let descList = element.parentNode;
    let descDetails = descList.getElementsByTagName("dd");
    descList.classList.toggle("show_dl");

    let isOn;
    for (let index = 0; index < descDetails.length; index++) 
    {
        descDetails[index].classList.toggle("display");
        isOn = descDetails[index].classList.contains("display");
    }
    
    if(isOn)
        currentList = element;
    else
        currentList = undefined;
}