
var PageTerminalMsgAdd = function(){
    return {
        defaultOption: {
            basePath:"",
            action : "",
            terminalMsgForm : null
            
        },
        init :function ()
        {
            mini.parse();
            this.basePath = PageMain.basePath;
            this.terminalMsgForm = new mini.Form("terminalMsgFormAdd");
        },
        funSetData : function(data)
        {
        	var row = data.row;
        	this.action = data.action;
        	this.terminalMsgForm.setData(row);
        	if(this.action == "oper")
        	{
        		
        		mini.get("layout_terminalMsg_add").updateRegion("south", { visible: false });//$(".mini-toolbar").hide();
        		var fields = this.terminalMsgForm.getFields();
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
        	this.terminalMsgForm.validate();
            if (!this.terminalMsgForm.isValid()) 
            {
                 var errorTexts = form.getErrorTexts();
                 for (var i in errorTexts) 
                 {
                     mini.alert(errorTexts[i]);
                     return;
                 }
            }
            
            var me = this;
            var obj = this.terminalMsgForm.getData(true);
            $.ajax({
               url : PageMain.defaultOption.httpUrl + "/terminalMsg/" + me.action + "?a="+Math.random(),
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
	PageTerminalMsgAdd.init();
});