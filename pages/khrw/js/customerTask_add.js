
var PageCustomerTaskAdd = function(){
    return {
        defaultOption: {
            basePath:"",
            action : "",
            customerTaskForm : null
            
        },
        init :function ()
        {
            mini.parse();
            this.basePath = PageMain.basePath;
            this.customerTaskForm = new mini.Form("customerTaskFormAdd");
        },
        funSetData : function(data)
        {
        	var row = data.row;
            mini.get("selfBuckle").setData(row.selfBuckleFly);
        	this.defaultOption.action = data.action;
            PageMain.callAjax(PageMain.defaultOption.httpUrl + "/customerTask/loadCustomer",{pageSize:10000, key:data.action, id:row.contractId}, function (data) {
            mini.get("contractId").setData(data);
        },"application/x-www-form-urlencoded", false);
        	this.customerTaskForm.setData(row);
            if(this.defaultOption.action == "add")
            {

               // mini.get("type").setValue(1);
                //mini.get("status").setValue(1);
            }
            PageCustomerTaskAdd.funSetCustomer();
        	if(this.defaultOption.action == "oper")
        	{
        		mini.get("layout_customerTask_add").updateRegion("south", { visible: false });//$(".mini-toolbar").hide();
        		var fields = this.customerTaskForm.getFields();
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
        	this.customerTaskForm.validate();
            if (!this.customerTaskForm.isValid()) 
            {
                 var errorTexts = this.customerTaskForm.getErrorTexts();
                 for (var i in errorTexts) 
                 {
                     mini.alert(errorTexts[i]);
                     return;
                 }
            }
            
            var me = this;
            var obj = this.customerTaskForm.getData(true);
            $.ajax({
               url : PageMain.defaultOption.httpUrl + "/customerTask/" + me.defaultOption.action + "?a="+Math.random(),
               type : 'POST',
               data : obj,
               dataType: 'json',
               success: function (data) 
               {
            	   if (data.success)
                   {
                       if(me.defaultOption.action == "add")
                       {
                           mini.confirm("操作成功是否要继续增加客户任务流向", "提醒",
                               function (action, value) {
                                   if (action == "ok")
                                   {
                                       PageMain.funCloseWindow({op:"continue", taskId:data.data, customerId:mini.get("customerId").getValue(), contractId:mini.get("contractId").getValue(), totalLoad:mini.get("totalLoad").getValue()});
                                   }
                                   else
                                   {
                                       PageMain.funCloseWindow("save");
                                   }
                               }
                           );
                       }
                       else
                       {
                           mini.alert("操作成功", "提醒", function(){
                               if(data.success)
                               {
                                   PageMain.funCloseWindow("save");
                               }
                           });
                       }
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
        },
        funSetCustomer:function () {
            var customerIdCombo = mini.get("customerId");
            var id = mini.get("contractId").getValue();
            if (id == "")
            {
                return ;
            }
            customerIdCombo.setValue("");
            var url = PageMain.defaultOption.httpUrl + "/customerTask/loadContractById?key=" + id
            customerIdCombo.setUrl(url);
            customerIdCombo.select(0);
        }
    }
}();

$(function(){
	PageCustomerTaskAdd.init();
});