createDialog().then( config => {
	return DecoupledEditor
		.create( document.querySelector( '.editor' ), {
			licenseKey: config.licenseKey,
			ckbox: {
				tokenUrl: config.ckboxTokenUrl
			}
		} )
		.then( editor => {
			window.editor = editor;

			// Set a custom container for the toolbar.
			document.querySelector( '.document-editor__toolbar' ).appendChild( editor.ui.view.toolbar.element );
			document.querySelector( '.ck-toolbar' ).classList.add( 'ck-reset_all' );
		} )
		.catch( handleSampleError );
} );

function handleSampleError( error ) {
	const issueUrl = 'https://github.com/ckeditor/ckeditor5/issues';

	const message = [
		'Oops, something went wrong!',
		`Please, report the following error on ${ issueUrl } with the build id "g4kza8l2c5zo-cph5azhnbclw" and the error stack trace:`
	].join( '\n' );

	console.error( message );
	console.error( error );
}
