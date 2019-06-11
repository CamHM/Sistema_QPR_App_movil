const url = 'http://192.168.1.6:8001/post/dashboard';
const urlImg = 'http://192.168.1.6:8001/download';
const urlReferenceImg = 'http://192.168.1.6:8001/photopost/post';

$(document).ready(function(){
    let posts = [];
    $.getJSON(url, function (data) {
        posts = data;
        const ionContent = document.getElementById('content');
        const ionRow = document.createElement('ion-row');
        ionContent.appendChild(ionRow);
        for (let i = 0; i < posts.length; i++) {
            let slideOptions = {
                loop: true,
                initialSlide: 0,
                speed: 400
            };
            const ionCol = document.createElement('ion-col');
            ionCol.size = "3";
            const ionCard = document.createElement('ion-card');
            const ionCardContent = document.createElement('ion-card-content');
            const ionSlides = document.createElement('ion-slides');
            ionSlides.pager = true;
            ionSlides.options = slideOptions;
            //Inicio petición de imágenes por publicación
            let post = {
                id_post: posts[i].id_post
            };
            $.ajax({
                type: "POST",
                url: urlReferenceImg,
                dataType: 'json',
                data: JSON.stringify(post),
                contentType: 'application/json',
                success: function (data, status, jqXHR) {
                    for (let i = 0; i < data.length; i++) {
                        const slide = document.createElement('ion-slide');
                        const img = document.createElement('img');
                        let path = {
                            path_img: data[i].img
                        };
                        $.ajax({
                            type: "POST",
                            url: urlImg,
                            dataType: 'json',
                            data: JSON.stringify(path),
                            contentType: 'application/json',
                            success: function (res) {
                                img.src = 'data:image/jpeg;base64,' + res.img;
                                slide.appendChild(img);
                            }
                        });
                        ionSlides.appendChild(slide);
                    }
                }
            });

            let pTitle = document.createElement('p');
            let pDesc = document.createElement('p');
            let pCoor = document.createElement('p');
            let pDate = document.createElement('p');
            let pHour = document.createElement('p');
            const title = document.createTextNode(`Título: ${posts[i].title}`);
            const desc = document.createTextNode(`Descripción: ${posts[i].content}`);
            const coors = document.createTextNode(`Coordenadas: ${posts[i].longitude} - ${posts[i].latitude}`);
            const date = document.createTextNode(`Fecha: ${posts[i].date}`);
            const hour = document.createTextNode(`Hora: ${posts[i].time_post}`);
            pTitle.appendChild(title);
            pDesc.appendChild(desc);
            pCoor.appendChild(coors);
            pDate.appendChild(date);
            pHour.appendChild(hour);
            ionCardContent.append(pTitle, pDesc, pCoor, pDate, pHour, ionSlides);
            ionCard.appendChild(ionCardContent);
            ionCol.appendChild(ionCard);
            ionRow.appendChild(ionCol);
        }
        ionContent.appendChild(ionRow);
    });
});
