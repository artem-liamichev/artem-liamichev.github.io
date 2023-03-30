

  const headerList = document.getElementById('js--header-list');
  const headerModalList = document.getElementById('js--headerModalList');
  
  function GoToFormatSectionAtMainPage (list) {

    const headerLinks = list.querySelectorAll('a');
  
    for (let i = 0; i < headerLinks.length; i++) {
      headerLinks[i].addEventListener('click', function () {
        let keyValue;
        switch (i) {
          case 0:
            keyValue = 0;
            break;
          case 1:
            keyValue = 2;
            break;
          case 2:
            keyValue = 1;
            break;
          case 3: 
            keyValue = 0;
            break;      
        }
        localStorage.setItem('fromInnerPage', keyValue)
      })
    }

  }
  
GoToFormatSectionAtMainPage(headerList)
GoToFormatSectionAtMainPage(headerModalList)

//footer

const linksOfFooterNavigation = document.getElementById('js--footerList').querySelectorAll('a')
for (let i = 0; i < linksOfFooterNavigation.length; i++) {
  linksOfFooterNavigation[i].addEventListener('click', function () {
    localStorage.setItem('fromInnerPageFromFooter', i)
    console.log(localStorage.getItem('fromInnerPageFromFooter'))
  }) 
}