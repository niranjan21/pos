'use strict';

// Configuring the Core module
angular.module('core').run(['Menus',
	function(Menus) {
		// Set top bar menu items
    
      Menus.addMenuItem('topbar', 'Categories', 'category', 'dropdown');
      
      Menus.addSubMenuItem('topbar', 'category', 'Product Category', 'product-categories');
      
    
      Menus.addMenuItem('topbar', 'Product', 'product', 'dropdown');
      
      Menus.addSubMenuItem('topbar', 'product', 'Product', 'products');
      
    
      Menus.addMenuItem('topbar', 'Supplier', 'supplier', 'dropdown');
      
      Menus.addSubMenuItem('topbar', 'supplier', 'Supplier', 'suppliers');
      
    
	}
]);
