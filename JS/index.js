$(document).ready(()=>{
    
    const server_url = "http://127.0.0.1:8000/file_upload"

    $("#file_input").on("change",(e)=>{
        let file = e.target.files[0]
        let filename = file.name
        let fd = new FormData()
        fd.append('xlfile',file)

        if(filename.includes(".xlsx")){
            
            $('#upload_button').on("click",()=>{
                let ajax = $.ajax(server_url,{
                    method:'post',
                    dataType:'json',
                    data: fd,
                    contentType:false,
                    processData:false,
                })
    
                ajax.done((msg)=>{
                    if(msg.error != undefined){
                        $(".al").append(
                            `
                            <div class="alert alert-danger" role="alert">
                                File must be in .xlsx format
                            </div>
                            `
                        )
                    }
                    else{
                        data = JSON.parse(msg)
                        $.each(data,(index,value)=>{
                            $("#values").append(
                                `
                                <tr>
                                <td>${index}</td>
                                <td>${value}</td>
                                </tr>
                                `
                            )
                            $("#table").css("display",'')
                        })
                    }
                })
                ajax.fail((msg)=>{
                    console.log('something went wrong ry again later')
                })
            })
        }
        else{
            $(".al").append(
                `
                <div class="alert alert-danger" role="alert">
                    File must be in .xlsx format
                </div>
                `
            )
        }
    })
})

