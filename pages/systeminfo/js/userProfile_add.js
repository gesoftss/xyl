
var PageUserProfileAdd = function(){
    return {
        defaultOption: {
            basePath:"",
            action : "",
            userProfileForm : null

        },
        init :function ()
        {
            mini.parse();
            this.basePath = PageMain.basePath;
            this.userProfileForm = new mini.Form("userProfileFormAdd");
            mini.get("gender").setData([{id:0,name:"未知"},{id:1, name:"男"},{id:2, name:"女"}]);
            mini.get("department").setData([{id:1, name:"市场部"},{id:2, name:"运营部"}])
        },
        funSetData : function(data)
        {
            var row = data.row;
            this.action = data.action;

            mini.get("department").setData(row.dataDictFly);
            this.userProfileForm.setData(row);
            if(this.action == "oper")
            {
                mini.get("layout_userProfile_add").updateRegion("south", { visible: false });//$(".mini-toolbar").hide();
                var fields = this.userProfileForm.getFields();
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
            if (PageMain.funDealSubmitValidate(this.userProfileForm))
            {
                return ;
            }

            var me = this;
            var obj = this.userProfileForm.getData(true);
            $.ajax({
                url : PageMain.defaultOption.httpUrl + "/user/" + me.action + "?a="+Math.random(),
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
    PageUserProfileAdd.init();
});