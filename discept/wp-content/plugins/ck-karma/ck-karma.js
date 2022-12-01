	/*
	Plugin Name: Comment Karma
	Plugin URI: http://cyber-knowledge.net/blog/2006/10/15/wordpress-plugin-rate-your-comments-comment-karma/
	Description: Allows you to rate comments up or down.
	Author: Alex Bailey and Kirk
	Author URI: http://cyber-knowledge.net
	Version: 1.1
	*/ 

	/*
	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; either version 2 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.
	
	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
	*/

function createXMLHttpRequest(){
    var xmlhttp = null;
    try {
        // Moz supports XMLHttpRequest. IE uses ActiveX.
        // browser detction is bad. object detection works for any browser
        xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
        // browser doesn’t support ajax. handle however you want
        //document.getElementById("errormsg").innerHTML = "Your browser doesnt support XMLHttpRequest.";
        alert("Your browser does not support the XMLHttpRequest Object!");
    }
    return xmlhttp;
}

var xhr = createXMLHttpRequest();

function karma(id, action, path, t_prefix){
    xhr.open('get', 'http\://'+ path +'ck-processkarma.php?id='+ id +'&action='+ action +'&path='+ path +'&prefix='+ t_prefix);
    xhr.onreadystatechange = handleResponse;
    xhr.send(null);
}

function handleResponse(){
    if(xhr.readyState == 4){
        var response = xhr.responseText.split('|');
        
        if(response[0] == 'done'){
            if(response[1]){
                //Changes the thumbs to dull gray and disable the action
                document.getElementById("down-"+response[1]).src        = "http://"+response[3]+'images/gray_down.gif';
                document.getElementById("down-"+response[1]).onclick    = '';
                document.getElementById("up-"+response[1]).src          = "http://"+response[3]+'images/gray_up.gif';
                document.getElementById("up-"+response[1]).onclick      = '';
                //Update the karma number display
                //Grab prefix for minus and positive numbers
                if(response[2] < 0){
                    var prefix = '';
                } else {
                    var prefix = '+';
                }
                if(!response[2]){
                	alert("Response has no value");
                }
                var karmanumber = prefix + response[2];
                //The below line is commented out because there is no karma number atm.
                document.getElementById("karma-"+response[1]).innerHTML = karmanumber;
            } else {
                alert("WTF ?");
            }
        }
        else if(response[0] == 'error')
        {
            var error = 'Error: '+response[1];
            alert(error);
        } else {
        	alert("Reponse: "+response[0]);
            alert("Karma not changed, please try again later.");
        }
    }
}
