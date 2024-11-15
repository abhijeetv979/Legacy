// document.querySelector('.outer-div').addEventListener('mouseenter', function (e) {
//     console.log('Mouse entered outer div', e.timeStamp
//     );
// });

// document.querySelector('.outer-div').addEventListener('mouseleave', function () {
//     console.log('Mouse left outer div');
// });

// document.querySelector('.inner-div').addEventListener('click', function (e) {
//     console.log('Inner div clicked', e.timeStamp
//     );
// });

document.querySelector('#input').addEventListener('input', function (evt) {
    const fullString = 'Start have a job Start';
    const val = highlightSearchText(fullString)
    document.querySelector('#heading').innerHTML = val;
});

function highlightSearchText(fullString) {
    console.clear();

    const searchText = document.querySelector('#input').value;

    // Create a case-insensitive regular expression to match the searchText
    const regex = new RegExp(`(${searchText})`, 'gi');
    // <span class="highlight">$1</span>

    // Replace the matched search text with the span element (initial highlight)
    let highlightedString = fullString.replace(regex, `<>$1</>`);

    const words = searchText.split(' ').filter(word => word);
    console.log(highlightedString);
    // Loop through each word and apply highlighting if not already highlighted
    words.forEach(word => {
        const regex = new RegExp(`(${word})`, 'gi');
        highlightedString = highlightedString.replace(regex, `<>$1</>`);
        console.log(highlightedString);
    });

    highlightedString = removeNestedTags(highlightedString);

    highlightedString = highlightedString.replace(/<>/g, '<span class="highlight">').replace(/<\/>/g, '</span>');

    return highlightedString;
}

function removeNestedTags(html) {
    const regex = /<\/?([a-z]+)[^>]*>/gi;
    const tags = [];
    const matches = html.matchAll(regex);
  
    for (const match of matches) {
      const tag = match[1].toLowerCase();
      if (match[0].startsWith('<')) {
        tags.push(tag);
      } else {
        const closingTag = tags.pop();
        if (closingTag !== tag) {
          return html; // Invalid HTML structure
        }
      }
    }
  
    const outerTags = new Set(tags);
    return html.replace(regex, (match, tag) => {
      if (outerTags.has(tag)) {
        return match;
      } else {
        return '';
      }
    });
  }