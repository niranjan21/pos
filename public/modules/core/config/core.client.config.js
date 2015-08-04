'use strict';

// Configuring the Core module
angular.module('core').run(['Menus',
	function(Menus) {
		// Set top bar menu items
    
      Menus.addMenuItem('topbar', 'List Of Values', 'lov', 'dropdown');
      Menus.addSubMenuItem('topbar', 'lov', 'Product Category', 'product-categories');
      Menus.addSubMenuItem('topbar', 'lov', 'Product', 'products');
      Menus.addSubMenuItem('topbar', 'lov', 'Supplier', 'suppliers');
      Menus.addSubMenuItem('topbar', 'lov', 'Customer', 'customers');
      Menus.addSubMenuItem('topbar', 'lov', 'Purchase', 'purchases');
      Menus.addSubMenuItem('topbar', 'lov', 'Inventory', 'inventories');
      Menus.addMenuItem('topbar', 'Transactions', 'tran', 'dropdown');
      Menus.addSubMenuItem('topbar', 'tran', 'Purchase', 'purchases');
      Menus.addSubMenuItem('topbar', 'tran', 'Sale', 'sales');
    
	}
]);
