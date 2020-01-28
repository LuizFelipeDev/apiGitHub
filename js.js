function apiUsu(){  
    var nickname = String(document.getElementById('nick').value);       
    var request = new XMLHttpRequest();
    var dataUsu;
    request.onreadystatechange = function(){
        dataUsu = JSON.parse(request.response);
        if (request.status == 200 && this.readyState == 4 ) {       
            //var data = JSON.parse(request.response);                                     
            if(dataUsu.id != null){
                document.getElementById("nome").innerHTML = 'Nome: ' + dataUsu.name;
                document.getElementById("id").innerHTML = 'ID:' + dataUsu.id;   
                document.getElementById("img").src = dataUsu.avatar_url;

                if(dataUsu.location != null && dataUsu.email != null)
                {
                document.getElementById("local").innerHTML = 'Localização: ' + dataUsu.location;
                document.getElementById("email").innerHTML = 'Email: ' + dataUsu.email;
                }
                
                if(dataUsu.public_repos > 0){
                    apiRepo(dataUsu.repos_url);
                    
                }
                dataUsu == null;                                             
            }            
        }
        if(request.status == 404 && this.readyState == 4){
            alert("Usuário não encontrado!");
        }                            
    }       
    try{
        request.open('GET','https://api.github.com/users/' + nickname,true);
        request.send();
    }catch(e){alert("Erro na busca!")}    
}

function apiRepo(urlRepo){
    var request = new XMLHttpRequest();    
    var dataRepo;
    request.onreadystatechange = function(){
        dataRepo = JSON.parse(request.response);
        if (request.status == 200 && this.readyState == 4 ) {
            if(dataRepo != null){            
                for(var i=0; i<dataRepo.length; i++){                   
                    var nomeRepo = document.createElement("a");
                    nomeRepo.setAttribute('id','ts');
                    nomeRepo.innerHTML = dataRepo[i].name + "<br>";
                    nomeRepo.href = dataRepo[i].html_url;                                    
                    document.getElementById("repo").appendChild(nomeRepo);
                }               
                dataRepo == null;                                             
            }            
        }
    }
    
    try{
        request.open('GET',urlRepo,true);
        request.send();
    }catch(e){alert("Erro!")}
    
}

