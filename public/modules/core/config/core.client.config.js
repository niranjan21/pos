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
      
    
      Menus.addMenuItem('topbar', 'Customer', 'customer', 'dropdown');
      
      Menus.addSubMenuItem('topbar', 'customer', 'Customer', 'customers');
      
    
      Menus.addMenuItem('topbar', 'Purchase', 'purchase', 'dropdown');
      
      Menus.addSubMenuItem('topbar', 'purchase', 'Purchase', 'purchases');
      
      Menus.addSubMenuItem('topbar', 'purchase', 'Purchase Items', 'purchase-items');
      
    
      Menus.addMenuItem('topbar', 'Inventory', 'inventory', 'dropdown');
      
      Menus.addSubMenuItem('topbar', 'inventory', 'Inventory', 'inventories');
      
    
      Menus.addMenuItem('topbar', 'Sale', 'sale', 'dropdown');
      
      Menus.addSubMenuItem('topbar', 'sale', 'Sale', 'sales');
      
      Menus.addSubMenuItem('topbar', 'sale', 'Sales Items', 'sales-items');
      
    
	}
]);
