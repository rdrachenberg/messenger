function attachEvents() {
    let submitButton = document.getElementById('submit');
    let refreshButton = document.getElementById('refresh');

    submitButton.addEventListener('click', function(){
        let author = document.getElementById('author').value;
        let content = document.getElementById('content').value;
        // console.log(author);
        // console.log(content);
        let uri = `https://rest-messanger.firebaseio.com/messanger.json`;

        let messageData = {
            author: author,
            content: content
        };

        let addParams = {
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(messageData),
            method: "POST"
        };

        fetch(uri, addParams)
        .then(function(data) {
            // console.log(data);
            if(data.ok){
                data.json().then(function(res){
                    console.log(res);
                    document.getElementById('author').value = '';
                    document.getElementById('content').value = '';

                    return res;
                });
            } else {
                const err = 'This is a Error!!!';
                throw err;
            }
        })
        .catch(error => console.log(error));
    });
    refreshButton.addEventListener('click', function(){
        let author = document.getElementById('author').value;
        let content = document.getElementById('content').value;
        // console.log(author);
        // console.log(content);
        let uri = `https://rest-messanger.firebaseio.com/messanger.json`;

        let messageData = {
            author: author,
            content: content
        };

        let addParams = {
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(messageData),
            method: "POST"
        };

        fetch(uri)
        .then(function(data) {
            // console.log(data);
            if(data.ok){
                data.json().then(function(res){
                    // console.log(res);
                    let messagesId = document.getElementById('messages');
                    
                    let author = Object.values(res);
                    
                    author.forEach(element => {
                        if (element.autor != undefined && element.autor != '' && element.content != '' && element.content != undefined) {
                            messagesId.append(`${element.autor}: ${element.content}\n`);
                        } else if (element.author != undefined && element.author != '' && element.content != '' && element.content != undefined) {
                            messagesId.append(`${element.author}: ${element.content}\n`);
                            
                        }
                    });
                });
            } else {
                const err = 'This is a Error!!!';
                throw err;
            }
        })
        .catch(error => console.log(error));
    });
}

attachEvents();


/*


Firebase url for the requests - https://rest-messanger.firebaseio.com/messanger

{
    author: authorName,
    content: msgText,
}

<div id="main">
        <textarea id="messages" cols="80" rows="12" disabled="true"></textarea>
        <div id="controls">
            <label for="author">Name: </label><input id="author" type="text"><br>
            <label for="content">Message: </label><input id="content" type="text">
            //**       <input id="submit" type="button" value="Send">
            <input id="refresh" type="button" value="Refresh">
        </div>
    </div>
*/