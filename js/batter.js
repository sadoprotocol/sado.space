var batter_clipboard = false;
var batter = 
{
    copy: function(focus = false)
    {
        jQuery('body').on('click', '.btn-batter-copy', function(e)
        {
            e.preventDefault();
        })
        if(jQuery('.btn-batter-copy').length > 0)
        {
            try
            {
                if(focus)
                {
                    batter_clipboard = new ClipboardJS('.btn-batter-copy', {
                        container: document.getElementById(focus),
                        text: function(trigger) {
                            jQuery('.btn-copied').addClass('btn-plain');
                            jQuery('.btn-copied').removeClass('btn-copied');
                            jQuery(trigger).removeClass('btn-primary');
                            jQuery(trigger).removeClass('btn-plain');
                            jQuery(trigger).addClass('btn-copied');
                            var text = trigger.getAttribute('data-content');
                            return text;
                        }
                    });
                }
                else
                {
                    batter_clipboard = new ClipboardJS('.btn-batter-copy', {
                        container: document.getElementById('main-body'),
                        text: function(trigger) {
                            jQuery('.btn-copied').addClass('btn-plain');
                            jQuery('.btn-copied').removeClass('btn-copied');
                            jQuery(trigger).removeClass('btn-primary');
                            jQuery(trigger).removeClass('btn-plain');
                            jQuery(trigger).addClass('btn-copied');
                            var text = trigger.getAttribute('data-content');
                            return text;
                        }
                    });
                }
            }
            catch(err){}
        }
    },
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
                            batter.images(function()
                            {
                                batter.loader(false);
                            });
                        }
                    })
                });
            }
            else
            {
                batter.images(function()
                {
                    batter.loader(false);
                });
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
    images: function(callback = false)
    {
        var imgs = jQuery('[loading="lazy"]').length;
        if(imgs > 0 && typeof callback == 'function')
        {
            batter.loader(true, 'FETCHING');
            
            async function loop() 
            {
                for(im = 0; im < imgs; im++)
                { 
                    var img = jQuery('[loading="lazy"]')[im];
                    var src = jQuery(img).attr('data-src');
                    await new Promise(next => 
                    {
                        batter.loader(true, 'FETCHING');
                        if(src)
                        {
                            
                            if(jQuery(img).hasClass('form-control'))
                            {
                                var this_callbck = function(txt, err = false)
                                {
                                    jQuery(img).text(txt);
                                    next();
                                }
                                var headers = 
                                {
                                    crossOrigin: 'anonymous'
                                };
                                fetch
                                (
                                    src, 
                                    {
                                        method: 'POST',
                                        headers: headers
                                    }
                                )
                                .then(response => response.text())
                                .then(response => this_callbck(response))
                                .catch(response => this_callbck(false, 'catch'))
                            }
                            else if
                            (
                                typeof jQuery(img).attr('type') != 'undefined'
                                && jQuery(img).attr('type')
                                && 
                                (
                                    jQuery(img).attr('type').indexOf('video') === 0
                                    || jQuery(img).attr('type').indexOf('audio') === 0
                                )
                            ){
                                jQuery(img).attr('src', src);
                                
                                setTimeout(function()
                                {
                                    next();
                                }, 300)
                            }
                            else
                            {
                                var image = new Image();
                                image.onload = function () 
                                {
                                    jQuery(img).attr('src', src);
                                    next();
                                }
                                image.onerror = function () 
                                {
                                   next();
                                }
                                image.crossOrigin = "anonymous";
                                image.src = src;
                            }
                        }
                        else
                        {
                            next();
                        }
                    })
                }
            }
            loop().then(() => 
            {
                callback();
            })
        }
        else
        {
            callback();
        }
    },
    init: function()
    {
        if(window.location.href.indexOf('/demo/') > 0)
        {
            batter.sado.orderbook.get(function(orderbook)
            {
                if
                (
                    typeof orderbook == 'object'
                    && typeof orderbook.orders == 'object'
                    && typeof orderbook.offers == 'object'
                ){
                    var orders = JSON.parse(JSON.stringify(orderbook.orders));
                    var offers = JSON.parse(JSON.stringify(orderbook.offers));
                    
                    jQuery.each(orders, function(ord)
                    {
                        var price = parseFloat(orderbook.orders[ord].satoshis / (10 ** 8));
                        orderbook.orders[ord].price = price;
                        
                        orders[ord].inscription = orders[ord].inscriptions[0];
                        orders[ord].ordinal = orders[ord].ordinals[0];
                        
                        orderbook.orders[ord].inscription = JSON.parse(JSON.stringify(orders[ord].inscription));
                        orderbook.orders[ord].ordinal = JSON.parse(JSON.stringify(orders[ord].ordinal));
                        
                        orderbook.orders[ord].formats = 
                        {
                            image: false,
                            audio: false,
                            video: false,
                            text: false
                        }
                        if(orders[ord].inscription.media_type.indexOf('image') === 0)
                        {
                            orderbook.orders[ord].formats.image = true;
                            orderbook.orders[ord].type = 'image';
                        }
                        else if(orders[ord].inscription.media_type.indexOf('audio') === 0)
                        {
                            orderbook.orders[ord].formats.audio = true;
                            orderbook.orders[ord].type = 'audio';
                        }
                        else if(orders[ord].inscription.media_type.indexOf('video') === 0)
                        {
                            orderbook.orders[ord].formats.video = true;
                            orderbook.orders[ord].type = 'video';
                        }
                        else if
                        (
                            orders[ord].inscription.media_type.indexOf('text') === 0
                            || orders[ord].inscription.media_type.indexOf('json') > -1
                        )
                        {
                            orderbook.orders[ord].formats.text = true;
                            orderbook.orders[ord].type = 'text';
                        }
                    })
                    
                    jQuery.each(offers, function(ord)
                    {
                        var price = parseFloat(orderbook.offers[ord].satoshis / (10 ** 8));
                        orderbook.offers[ord].price = price;
                        
                        offers[ord].inscription = offers[ord].inscriptions[0];
                        offers[ord].ordinal = offers[ord].ordinals[0];
                        
                        orderbook.offers[ord].inscription = JSON.parse(JSON.stringify(offers[ord].inscription));
                        orderbook.offers[ord].ordinal = JSON.parse(JSON.stringify(offers[ord].ordinal));
                        
                        orderbook.offers[ord].formats = 
                        {
                            image: false,
                            audio: false,
                            video: false,
                            text: false
                        }
                        if(offers[ord].inscription.media_type.indexOf('image') === 0)
                        {
                            orderbook.offers[ord].formats.image = true;
                            orderbook.offers[ord].type = 'image';
                        }
                        else if(offers[ord].inscription.media_type.indexOf('audio') === 0)
                        {
                            orderbook.offers[ord].formats.audio = true;
                            orderbook.offers[ord].type = 'audio';
                        }
                        else if(offers[ord].inscription.media_type.indexOf('video') === 0)
                        {
                            orderbook.offers[ord].formats.video = true;
                            orderbook.offers[ord].type = 'video';
                        }
                        else if
                        (
                            offers[ord].inscription.media_type.indexOf('text') === 0
                            || offers[ord].inscription.media_type.indexOf('json') > -1
                        )
                        {
                            orderbook.offers[ord].formats.text = true;
                            orderbook.offers[ord].type = 'text';
                        }
                    })
                    
                    var data = 
                    {
                        apis: ordit_db.apis,
                        dashboard:
                        {
                            orders: orderbook.orders.length,
                            offers: orderbook.offers.length
                        },
                        offers: orderbook.offers,
                        orders: orderbook.orders
                    }
                    batter.html(data);
                }
                else
                {
                    batter.html(false);
                }
            });
        }
        else
        {
            batter.html(false);
        }
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
                batter.copy(id);
            });
            modal.show();
        }
    },
    sado:
    {
        orderbook:
        {
            get: function(callback)
            {
                if(typeof callback == 'function')
                {
                    var v = ordit_db.defaults.version;
                    var n = ordit_db.defaults.network;
                    var saved_orders = sessionStorage.getItem('ordit_orderbook_cache_' + v + '_' + n);
                    if(saved_orders)
                    {
                        saved_orders = JSON.parse(saved_orders);
                    }
                    if(saved_orders)
                    {
                        callback(saved_orders);
                    }
                    else
                    {
                        ordit_apis.batter('../sado/get', ordit_db.addresses.orderbook, function(orderbook)
                        {
                            callback(orderbook);
                            if
                            (
                                typeof orderbook == 'object'
                                && typeof orderbook.orders == 'object'
                                && typeof orderbook.offers == 'object'
                            ){
                                try
                                {
                                    var v = ordit_db.defaults.version;
                                    var n = ordit_db.defaults.network;
                                    sessionStorage.setItem('ordit_orderbook_cache_' + v + '_' + n, JSON.stringify(orderbook));
                                }
                                catch(err)
                                {
                                    console.info('orderbook.store.err', err);
                                }
                            }
                        })
                    }
                }
            }
        }
    }
}

window.onload = function(e)
{
    if(typeof sado == 'object')
    {
        sado.init();
    }
    batter.init();
}