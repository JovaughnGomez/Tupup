

HighlightFilter();

function HighlightFilter()
{
    const path = window.location.pathname;
    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString);
    let orderStatus = urlParams.get('status'); 
    
    if(!orderStatus || orderStatus.length == 0)
        orderStatus = "?status=all";
    else orderStatus = `?status=${orderStatus}`;
    
    const filterLink = `${path}${orderStatus}`;
    const updatedLink = filterLink.replace("/member/", "");
    const filter = document.querySelector(`a[href*="${updatedLink}"]`);
    if(filter)
    {
        filter.classList.add("accent");
    }
}