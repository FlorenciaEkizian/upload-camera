    window.addEventListener('load', function(){
    	// Wait for PhoneGap to load
   		document.addEventListener("deviceready", arrancar, false);
    }, false);
    

    // PhoneGap is ready
    function arrancar() {
    	var startBtn = $('#startBtn');
    	
    	startBtn.click(function(){
    		sacarFoto();
    	});
    	
    }
    
    // toca el boton para sacar foto
    function sacarFoto() {
		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
		destinationType: Camera.DestinationType.FILE_URI
		});
    }

	function onSuccess(imageData) {
		var image = document.getElementById('myImage');
		image.src = imageData;
		
		var options = new FileUploadOptions();
		options.fileKey = "file";			
		options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
		options.chunkedMode=false;
		
		var ft = new FileTransfer();
		ft.upload(imageData, encodeURI("http://www.nicolascoletto.com/camarita/upload.php"), cargaOk, cargaNo, options);
	
	}
	
	function cargaOk(r) {
		var mensaje=document.getElementById("mensaje");
		mensaje.innerHTML="Archivo subido";	
	}	
	
	function cargaNo(error) {
		var mensaje=document.getElementById("mensaje");
		mensaje.innerHTML="Error, no se subio el archivo";
	}

	function onFail(message) {
		alert('Failed because: ' + message);
	}   
