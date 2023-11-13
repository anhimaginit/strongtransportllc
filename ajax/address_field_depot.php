<?php
use \SmartUI\Components\SmartForm;
/**
 * need variable : ex:
 * $addressField = array(
 *       'form' => $warranty_form,
 *       'current_form' -> 'add' or 'edit'
 *       "address1" => "warranty_address1",
 *       "address2" => "warranty_address2",
 *       "postal_code" => "warranty_postal_code",
 *       "city" => "warranty_city",
 *       "state" => "warranty_state",
 *   );
 */
?>
<fieldset class="pane_address" style="border-top: none; padding-top: 10px">
    
    <div class="row">
         
        <section class="col col-md-4 col-sm-4 col-xs-6">
            <label class="input">City</label>
            <select name="<?= $addressField['city'] ?>" class="city form-control col-12" style="width:100%" <?php hasPermission($addressField['form'], $addressField['city'], $addressField['current_form']) ? '' : 'disabled' ?>></select>
        </section>
         
         
        <section class="col col-md-4 col-sm-4 col-xs-6">
            <label class="input">State</label>
            <select name="<?= $addressField['state'] ?>" class="state form-control col-12" style="width:100%" <?php hasPermission($addressField['form'], $addressField['state'], $addressField['current_form']) ? '' : 'disabled' ?>> </select>
        </section>
        
        <section class="col col-md-4 col-sm-4 col-xs-6">
            <label class="input">Zipcode</label>
            <select name="<?= $addressField['postal_code'] ?>" class="postal_code col-12 form-control" style="width:100%" <?php hasPermission($addressField['form'], $addressField['postal_code'], $addressField['current_form']) ? '' : 'disabled' ?>></select>
        </section>
        
    </div>

    
    <?php if (! in_array($addressField['form'], ['WarrantyForm'])) { ?>
        
    <?php }  ?>
</fieldset>