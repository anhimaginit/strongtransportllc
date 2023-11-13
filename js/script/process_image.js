function process_image(){
    this.upload_tranfer = new DataTransfer()
    this.unload_tranfer = new DataTransfer()
    //this.was_changed =0;
}
process_image.NAME         = "process_image";
process_image.VERSION      = "1.2";
process_image.DESCRIPTION  = "Class process_image";

process_image.prototype.constructor = process_image;
process_image.prototype = {
    init: function(){
        /***************event*****************/
        //files
        $('#upload-attachement').on('click','.exsiting-file-delete',function(){
            $(this).closest('.row').remove();
        })
        $("#upload").on('change', function(e){
            var fileBloc ='';
            for(var i = 0; i < this.files.length; i++){
                fileBloc +='<div class="row padding_l15 m-t5" style="width: 100%">' +
                    '<div class="col col-9 file-name">'+this.files.item(i).name+'</div>' +
                    '<div class="col col-3 file-delete text-right" style="cursor: pointer"><fa class="fa fa-trash color-alert"></fa></div>' +
                    '</div>'
            };
            $("#upload-files-area").append(fileBloc);

            for (let file of this.files) {
                pro_img.upload_tranfer.items.add(file);
            }

            this.files = pro_img.upload_tranfer.files;

            $('#upload-files-area .file-delete').click(function(){
                let name = $(this).closest('.row').find('.file-name').text();
                $(this).parent().remove();
                for(let i = 0; i < pro_img.upload_tranfer.items.length; i++){
                    // Correspondance du fichier et du nom
                    if(name === pro_img.upload_tranfer.items[i].getAsFile().name){
                        pro_img.upload_tranfer.items.remove(i);
                        continue;
                    }
                }
                document.getElementById('upload').files = pro_img.upload_tranfer.files;
            });

        });

        $('#unload-attachement').on('click','.exsiting-file-delete',function(){
            $(this).closest('.row').remove();
        })
        $("#unload").on('change', function(e){
            var fileBloc ='';
            for(var i = 0; i < this.files.length; i++){
                fileBloc +='<div class="row m-t5" style="width: 100%">' +
                    '<div class="col col-9 file-name">'+this.files.item(i).name+'</div>' +
                    '<div class="col col-3 file-delete text-right" style="cursor: pointer"><fa class="fa fa-trash color-alert"></fa></div>' +
                    '</div>'
            };
            $("#unload-files-area").append(fileBloc);

            for (let file of this.files) {
                pro_img.unload_tranfer.items.add(file);
            }

            this.files = pro_img.unload_tranfer.files;

            $('#unload-files-area .file-delete').click(function(){
                let name = $(this).closest('.row').find('.file-name').text();
                $(this).parent().remove();
                for(let i = 0; i < pro_img.unload_tranfer.items.length; i++){
                    // Correspondance du fichier et du nom
                    if(name === pro_img.unload_tranfer.items[i].getAsFile().name){
                        pro_img.unload_tranfer.items.remove(i);
                        continue;
                    }
                }
                document.getElementById('unload').files = pro_img.unload_tranfer.files;
            });

        });
    },
    /***************************************/
    clear_data:function(){
        pro_img.upload_tranfer.clearData()
        pro_img.unload_tranfer.clearData()
    },

}

var pro_img = new process_image();
$(function(){
    pro_img.init();
});