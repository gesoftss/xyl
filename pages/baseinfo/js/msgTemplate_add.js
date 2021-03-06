
var PageMsgTemplateAdd = function(){
    return {
        defaultOption: {
            basePath:"",
            action : "",
            msgTemplateForm : null
            
        },
        init :function ()
        {
            mini.parse();
            this.basePath = PageMain.basePath;
            this.msgTemplateForm = new mini.Form("msgTemplateFormAdd");
            mini.get("status").setData([{id:1, name:"启用"},{id:2, name:"禁用"}]);
        },
        funSetData : function(data)
        {
        	var row = data.row;
        	this.action = data.action;
        	this.msgTemplateForm.setData(row);
            if(this.action == "add")
            {
                mini.get("status").setValue(1);
            }
            if(this.action == "oper")
            {
                mini.get("layout_msgTemplate_add").updateRegion("south", { visible: false });//$(".mini-toolbar").hide();
                var fields = this.msgTemplateForm.getFields();
                for (var i = 0, l = fields.length; i < l; i++)
                {
                    var c = fields[i];
                    if (c.setReadOnly) c.setReadOnly(true);     //只读
                    if (c.setIsValid) c.setIsValid(true);      //去除错误提示
                }
            }
        },
        funSave : function()
        {
        	this.msgTemplateForm.validate();
            if (!this.msgTemplateForm.isValid())
            {
                 var errorTexts = form.getErrorTexts();
                 for (var i in errorTexts) 
                 {
                     mini.alert(errorTexts[i]);
                     return;
                 }
            }
            
            var me = this;
            var obj = this.msgTemplateForm.getData(true);
            $.ajax({
               url : PageMain.defaultOption.httpUrl + "/msgTemplate/" + me.action + "?a="+Math.random(),
               type : 'POST',
               data : obj,
               dataType: 'json',
               success: function (data) 
               {
            	   if (data.success)
                   {
                       mini.alert("操作成功", "提醒", function(){
                           if(data.success)
                           {
                               PageMain.funCloseWindow("save");
                           }
                       });
                   }
                   else
                   {
                       PageMain.funShowMessageBox(data.msg);
                   }
               },
               error: function (jqXHR, textStatus, errorThrown) 
               {
            	   PageMain.funShowMessageBox("操作出现异常");
               }
           });
        },
        funCancel : function()
        {
        	PageMain.funCloseWindow("cancel");
        }
    }
}();

$(function(){
    PageMsgTemplateAdd.init();
});