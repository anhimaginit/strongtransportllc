<?php

require_once 'inc/init.php';
$roleForm = 'PermissionForm';
// $_authenticate->checkFormPermission($roleForm);
$role = 'edit';
$hasGroup = isset($_GET['gr']);
?>
<div>
    <h1><?= $hasGroup ? 'ACL Role' : 'General ACL (For None Group Users)' ?></h1>
</div>
<section id="widget-grid" class="">
    <?php include_once 'modal/modal_success.php'; ?>
    <div class="row">
        <div class="smart-form padding-5" id="role_form" style="width:98%">
            <div class="smart-form" id="message_form"></div>
            <fieldset>
                <div class="row">
                    <section class="col col-3">
                        <label class="label">Unit</label>
                        <label class="select">
                            <select name="acl_types" id="unit"></select><i></i>
                        </label>
                    </section>
                    <section class="col col-3">
                        <label class="label">Role</label>
                        <label class="select ">
                            <select name="level" id="levels"></select><i></i>
                        </label>
                    </section>
                    <?php if ($hasGroup) {
                        $groupList = HTTPMethod::httpPost(HOST . '/_groupList.php', array(
                            'token' => $_SESSION['token'],
                            'jwt' => $_SESSION['jwt'],
                            'private_key' => $_SESSION['userID'],
                            'role' => array((object) array(
                                'department' => $_SESSION['actor'],
                                'level' => $_SESSION['level']
                            )),
                            'login_id' => $_SESSION['userID']
                        ))->list;

                        function sortGroup($a, $b)
                        {
                            $r = strcmp($a->department, $b->department);
                            if ($r < 0 || $r > 0) {
                                return $r;
                            } else {
                                $r = strcmp($a->role, $b->role);
                                if ($r < 0 || $r > 0) {
                                    return $r;
                                } else {
                                    return strcmp($a->group_name, $b->group_name);
                                }
                            }
                        }
                        usort($groupList, 'sortGroup');

                        ?>
                        <section class="col col-3">
                            <label class="inputt">Group</label>
                            <label class="select">
                                <select name="group" id="group">
                                    <option value="">Select Group</option>
                                    <?php
                                        $preDepartment = '';
                                        foreach ($groupList as $group) {
                                            if ($preDepartment !== $group->department) {
                                                if ($preDepartment !== '') {
                                                    echo '</optgroup>';
                                                }
                                                echo '<optgroup label="' . $group->department . '">';
                                            }
                                            echo '<option value="' . $group->ID . '" data-level="' . $group->role . '" data-unit="' . $group->department . '">' . $group->group_name . ' (' . $group->role . ')</option>';
                                            $preDepartment = $group->department;
                                        }
                                        if ($preDepartment !== '') {
                                            echo '</optgroup>';
                                        }
                                        ?>
                                </select><i></i>
                            </label>
                        </section>
                    <?php } ?>
                </div>
            </fieldset>
            <fieldset id="acl_content">
                <input type="hidden" id="g-id">
                <!--tab-->
                <div class="panel-content m-t20">
                    <ul class="nav nav-tabs" id="ul-acl" role="tablist">

                    </ul>
                    <div class="tab-content m-h500" id="body-acl">

                    </div>
                    <div class="col-12 mt10pb30" id="anchor_btn"></div>
                 </div>

                <!--endtab-->
            </fieldset>
        </div>
    </div>
</section>
<script src="<?php echo ASSETS_URL; ?>/js/script/acl/acl.js"></script>
<script src="<?php echo ASSETS_URL; ?>/js/script/common_f.js"></script>

<script type="text/javascript">
    var is_addedit='<?php echo $_SESSION['int_acl']['acl_rules']['PermissionForm']['acl_form']['edit'];?>';
</script>
