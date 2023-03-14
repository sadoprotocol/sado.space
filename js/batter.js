var batter = 
{
    html: function(data = {dashboard: {orders:0, offers: 0}})
    {
        var render_markdown = function()
        {
            if(jQuery('.batter-markdown').length > 0)
            {
                var md_count = 0;
                jQuery('.batter-markdown').each(function(i)
                {
                    var div = jQuery(this);
                    var url = jQuery(div).attr('data-url');
                    batter.md(url, function(html)
                    {
                        jQuery(div).html(html);
                        md_count++
                        if(md_count == jQuery('.batter-markdown').length)
                        {
                            batter.loader(false);
                        }
                    })
                });
            }
            else
            {
                batter.loader(false);
            }
        }
        
        var m_count = 0; 
        if(jQuery('.batter-mustache').length > 0)
        {
            jQuery('.batter-mustache').each(function(i)
            {
                var div = jQuery(this);
                var c = jQuery(div).html();
                var html = Mustache.render(c, data);
                jQuery(div).html(html);
                m_count++;
                if(m_count == jQuery('.batter-mustache').length)
                {
                    render_markdown();
                }
            });
        }
        else
        {
            render_markdown();
        }
    },
    init: function()
    {
        batter.html();
    },
    loader: function(open = false, text = false)
    {
        if(open) jQuery('body').addClass('loading');
        else jQuery('body').removeClass('loading');

        if(text) jQuery('body').attr('data-text', text);
        else jQuery('body').attr('data-text', 'LOADING');
    },
    md: function(url, callback)
    {
        if(url && typeof callback == 'function')
        {
            jQuery.ajax({
                url: url,
                dataType: 'html',
                async: true,
                cache: false,
                success: function(res)
                {
                    var html = marked.parse(res);
                    callback(html);
                }
            });
        }
    },
    modal: function(title, contents, id = false)
    {
        if((title && contents) || id)
        {
            batter.loader(false);
            if(jQuery('.modal.show').length > 0)
            {
                jQuery('.modal.show').each(function(m)
                {
                    var id = jQuery(this).attr('id');
                    var this_modal = bootstrap.Modal.getInstance(
                        document.getElementById(id)
                    );
                    this_modal.hide();
                });
            }
            if(!id)
            {
                id = 'default-modal';
                jQuery('#' + id).find('.modal-title').text(title);
                jQuery('#' + id).find('.modal-body').html(contents);
            }

            var el = document.getElementById(id);
            var modal = new bootstrap.Modal(el, {
                keyboard: true,
                backdrop: true,
                focus: false
            });
            el.addEventListener('hidden.bs.modal', function (event)
            {

            });
            el.addEventListener('shown.bs.modal', function (event)
            {

            });
            modal.show();
        }
    }
}

window.onload = function(e)
{
    batter.init();
}