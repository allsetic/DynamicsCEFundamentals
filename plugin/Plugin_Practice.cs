using System;
using System.Linq;
using Microsoft.Xrm.Sdk;

namespace MyFirstPlugin
{
    public class AccountUpdatePlugin : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            var context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            if (context.MessageName != "Update")
                return;

            if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity entity)
            {
                if (entity.LogicalName != "account")
                    return;

                if (entity.Attributes.Contains("parentaccountid"))
                {
                    if (entity["parentaccountid"] == null)
                    {
                        throw new InvalidPluginExecutionException("Parent account is required.");
                    }
                }

                if (entity.Attributes.Contains("telephone1"))
                {
                    if (context.PreEntityImages.Contains("PreImage") && context.PreEntityImages["PreImage"] is Entity preImage)
                    {
                        var oldPhone = preImage.Contains("telephone1") ? preImage["telephone1"].ToString() : "(vacío)";
                        var newPhone = entity["telephone1"].ToString();

                        var message = $"Telephone updated, before: '{oldPhone}', after: '{newPhone}'.";

                        entity["myc_updatecomment"] = message;
                    }
                }
            }
        }
    }

}
