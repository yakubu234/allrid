function publicShortLink(event) {
    event.preventDefault();
    startLoader();


    let public_url = document.getElementById('public_url').value;
    var data = JSON.stringify({
        "original_link": public_url
    });

    var client = new HttpClientPost();

    client.get('/api/shorthen/add.link.public', data, null, null, (response) => {

        if (response.status == 'error') {
            console.log(response)
            // Object.keys(d).forEach(key => {// console.log(key, d[key]);
            //     if(key == 'password'){
            //         document.querySelector('input[name|='+key+']').value='';
            //         document.querySelector('input[name|=password_confirmation]').value='';
            //     }

            //     $(document).find('[name='+key+']').after('<span class="text-strong text-danger">' +d[key]+ '</span>')

            // });
        }

        if (response.status == 'success') {
            data = response.data.shortLink
            const short_id = data.short_link
            const short_url = data.short_url
            const message = `${response.message} : you can find the new url at the table below. click on the clipboard to copy`
            document.getElementById('url_table_div').style.display = "block"; // show the url table
            let url_table_body = document.getElementById('url_table_body'); // get the table body dom
            let message_success = document.getElementById('message-success'); // get the message dom
            message_success.innerHTML += message

            url_table_body.innerHTML += '<tr><td><a href="student-profile.html" class="refer-avatar-blk d-flex align-items-center"> <img src="assets/img/students/refer-img10.png" class="rounded-circle me-2" alt="Referred User Info"> <p>Anonymous</p>  </a></td><td>' + short_id + '</td> <td><span class="text-wrap">' + short_url + '</span></td>   <td><a href="javascript:;" class="btn-style"><i class="feather-clipboard" onclick="copyToClipboard(\'' + short_url + '\')"></i></a></td> <td class="text-center">0</td> </tr>'
            stopLoader();
            // public_url.reset()
        }


    });

}


function copyToClipboard(text) {
    // Create a new textarea element.
    const textarea = document.createElement('textarea');
    textarea.value = text;

    // Append the textarea element to the document body.
    document.body.appendChild(textarea);

    // Select the text in the textarea element.
    textarea.select();

    // Copy the selected text to the clipboard.
    document.execCommand('copy');
    alert('Text copied to clipboard: ' + text);

    // Remove the textarea element from the document body.
    document.body.removeChild(textarea);
}