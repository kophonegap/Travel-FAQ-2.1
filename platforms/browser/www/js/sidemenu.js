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
 

$(document).on("pagecreate", "#main", function () {
    var ic = '<span class="ui-icon-minus ui-btn-icon-notext inlineIcon"></span>';
    $(".ui-li-divider").prepend(ic);
	//$("#allCountries li").hide();
	
	
	
});
$(document).on("click", ".collapseExpand", function () {
    var collapseAll = this.id == "btnCollapse";
    if (collapseAll) {
        $(".ui-li-divider .ui-icon-minus").click();
    } else {
        $(".ui-li-divider .ui-icon-plus").click();
    }
});




$(document).on("click", '.ui-li-divider', function (e) {
    var IsCollapsed = false;
    var TheDivider = $(this);
    var li = TheDivider.next(':not(.ui-li-divider)');
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