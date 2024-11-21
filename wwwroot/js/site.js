
function loadModal(url, modal, title, size, isToggled) {

    console.log(modal);
    $(modal + ' .overlay').removeClass('d-none');
    $(modal + ' .modal-dialog').removeClass('modal-sm');
    $(modal + ' .modal-dialog').removeClass('modal-md');
    $(modal + ' .modal-dialog').removeClass('modal-lg');
    $(modal + ' .modal-dialog').removeClass('modal-xl');
    $(modal + ' .modal-dialog').removeClass('modal-fullscreen');
    $(modal + ' .modal-dialog').addClass('modal-' + size);
    $(modal + ' .modal-body').html('<div class="mt-5 mb-5"></div>');

    //if not toggle in button
    if (!isToggled)
        $(modal).modal('show');

    $.ajax({
        type: 'GET',
        url: url,
        success: function (res) {
       
            $(modal + ' .modal-body').html(res);
            $(modal + ' .modal-title').html(title);
            $(modal + ' .overlay').addClass('d-none');

            //load tooltip
            $('.modal [data-toggle="tooltip"]')
                .tooltip({ trigger: 'hover' });
        },
        error: function (result) {
            $(modal + ' .modal-body').html(`<p>${result.responseText}</p>`);
            if (result.status == 403 || result.status == 401)
                $(modal + ' .modal-body').html(`<p><b>Unauthorized!</b> Access to the requested resource is forbidden.</p>`);

            $(modal + ' .modal-title').html('Error Message');
            $(modal + ' .overlay').addClass('d-none');

        }
    });
};
