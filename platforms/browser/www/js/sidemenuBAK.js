// JavaScript Document
/**
 * Author,email :     Aldrin Rasdas , arasdas@coca-cola.com
 * Date Create  :     April, 2014
 * Description  :     Contains methods/functions that deal mainly remote data
 *
 * REVISION HISTORY
 *
 * Author,email :	Raymund Niconi , niconi@coca-cola.com
 * Date Revised :	April, 2016
 * Description  :	Contains methods/functions that deal mainly remote data, UI enhancements and transitions
 *
 **/


$(document).ready(function(){ 
	$(".ui-listview > li").addClass('hidden'); 
	appUI.populateCountriesAll = function() {
	localStore.getData("SELECT *", null, null, function(localData) {			
		if (localData.length>0) {
			var len = localData.length;
			var list = $("#allCountries");
			list.empty();
			for (i=0; i<len; i++) {
				
				
				
			var code = localData[i].code;
				var name = localData[i].name;
				var li = document.createElement("li");
				var a = document.createElement("a");
				var title = document.createElement("span");
				var icon = document.createElement("img");
				var ic = '<span class="ui-icon-minus ui-btn-icon-notext inlineIcon"></span>';
				icon.style.width = "30px";
				icon.style.height = "30px";
				
				
				
				
				//var iconPath = config.fileSystemRootFolder + '/' + config.localImageFolderPath + '/' + code.toLowerCase() + ".png?" + Math.random();
				var iconPath = config.localImageFolderPath + '/' + code.toLowerCase() + ".png?" + Math.random();						
				if (!localFileExists(iconPath)) {
					iconPath = config.defaultIconPath;
				}
				icon.src = iconPath;			
				icon.style.verticalAlign="middle";
				icon.style.marginRight="20px";
				icon.style.marginLeft="5px";
				
				title.appendChild(icon);
				title.appendChild(document.createTextNode(name));
				
				a.appendChild(title);
				a.country = code;
				$(a).on("click", function() { {
					$("#listPanel").panel("close");
					$("#no_country_data").hide();
					appUI.populateCountryDetails(this.country,true);
				}});
				
				
				$(li).attr('region', localData[i].region);
				
				li.appendChild(a);
				
				list.append(li);
				
				
				

			}
			
		

						
			list.listview({
				autodividersSelector: function(li) {
					var ic = '<span class="ui-icon-minus ui-btn-icon-notext inlineIcon"></span>';
					return $(li).attr('region');
					
					$('.ui-listview > .ui-li-divider').prepend(ic);
					
					
				}
				
			});						
			
			appUI.clearCountryFilter();
			appUI.positionListFilter();						
			list.listview("refresh");
			list.listview("li");															
			appUI.resizeContent();
			appUI.resizeCountryList();
		}				
	});		
}
	  //header: "h3", collapsible: true, active: false 
});

$(document).on("pagecreate", "#main", function () {
	
	var ic = '<span class="ui-icon-minus ui-btn-icon-notext inlineIcon"></span>';
    $(".ui-listview > .ui-li-divider").prepend(ic);
	//alert(ic);
	
});
$(document).on("click", ".collapseExpand", function () {
    var collapseAll = this.id == "btnCollapse";
    if (collapseAll) {
        $(".ui-listview > .ui-li-divider .ui-icon-minus").click();
    } else {
        $(".ui-listview > .ui-li-divider .ui-icon-plus").click();
    }
});





$(document).on("click", '.ui-listview > .ui-li-divider', function (e) {
    var IsCollapsed = false;
    var TheDivider = $(this);
    var li = TheDivider.next(':not(.ui-listview > .ui-li-divider)');
    while (li.length > 0) {
        IsCollapsed = li.css('display') == 'none';
        var UseAnimation = $("#chkAnim").prop("checked");
        if (UseAnimation) {
            ApplyTransition(li, IsCollapsed);
        } else {
            li.slideToggle(300);
        }

        li = li.next(':not(.ui-li-divider)');
    }

    var $icon = TheDivider.find('.inlineIcon');
    if (!IsCollapsed) {
        $icon.removeClass('ui-icon-minus').addClass('ui-icon-plus');
    } else {
        $icon.removeClass('ui-icon-plus').addClass('ui-icon-minus');
    }
    e.stopPropagation();
    return false;
});

function ApplyTransition(li, IsCollapsed) {
    if (IsCollapsed) {
        li.show(0, function () {
            $(this).addClass('flow in').one('webkitAnimationEnd oanimationend msAnimationEnd mozAnimationEnd animationend', function (e) {
                $(this).removeClass('flow in');
            });
        });
    } else {
        li.addClass('flow out').one('webkitAnimationEnd oanimationend msAnimationEnd mozAnimationEnd animationend', function (e) {
            $(this).hide();
            $(this).removeClass('flow out');
        });
    }
}