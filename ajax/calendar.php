<?php require_once 'inc/init.php'; ?>
<!--
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap"
      rel="stylesheet">-->
<link rel="stylesheet" href="<?= ASSETS_URL ?>/css/bootstrap-timepicker.css">
<link rel="stylesheet" href="<?= ASSETS_URL ?>/css/calendar_style.css">

<section id="widget-grid">
    <div class="row">
        <div class="smart-form">
            <?php include_once 'modal/modal_calendar.php'; ?>
            <?php include_once 'modal/modal_assign_task.php'; ?>
            <?php include_once 'modal/modal_success.php'; ?>
            <div class="container">
                <button class="btn-calendar btn-calendar-prev">
                    <span><i class="fa fa-chevron-left" aria-hidden="true"></i></span>
                </button>
                <div class="calendar" id="calendar-id">
                    <h1>Calendar</h1>
                    <div class="info" id="calendar-main">
                        <input type="hidden" class="month_id" value="">
                        <input type="hidden" class="year_id" value="">
                        <p class="month">September</p>
                        <p class="year">2020</p>
                    </div>
                    <div class="date">
                        <div class="day-name">Sun</div>
                        <div class="day-name">Mon</div>
                        <div class="day-name">Tue</div>
                        <div class="day-name">Wen</div>
                        <div class="day-name">Thu</div>
                        <div class="day-name red-dart">Fri</div>
                        <div class="day-name red-dart">Sat</div>
                    </div>
                    <div class="date date-container">
                        <div class="day"></div>
                        <div class="day"></div>
                        <div class="day">1</div>
                        <div class="day">2</div>
                        <div class="day">3</div>
                        <div class="day">4</div>
                        <div class="day">5</div>
                        <div class="day">6</div>
                        <div class="day">7</div>
                        <div class="day">8</div>
                        <div class="day">9</div>
                        <div class="day active">10</div>
                        <div class="day">11</div>
                        <div class="day">12</div>
                        <div class="day">13</div>
                        <div class="day">14</div>
                        <div class="day">15</div>
                        <div class="day">16</div>
                        <div class="day">17</div>
                        <div class="day">18</div>
                        <div class="day">19</div>
                        <div class="day">20</div>
                        <div class="day">21</div>
                        <div class="day">22</div>
                        <div class="day">23</div>
                        <div class="day">24</div>
                        <div class="day">25</div>
                        <div class="day">26</div>
                        <div class="day">27</div>
                        <div class="day">28</div>
                        <div class="day">29</div>
                        <div class="day">30</div>
                        <div class="day">31</div>
                    </div>
                </div>
                <button class="btn-calendar btn-calendar-next">
                    <span><i class="fa fa-chevron-right" aria-hidden="true"></i></span>
                </button>
            </div>
        </div>
    </div>
</section>

<script src="<?= ASSETS_URL ?>/js/plugin/bootstrap-timepicker/jquery-timepicker.min.js"></script>
<script src="<?= ASSETS_URL ?>/js/util/control-select2.js"></script>
<script src="<?= ASSETS_URL ?>/js/script/date.format.min.js"></script>
<script src="<?= ASSETS_URL ?>/js/jquery.twbsPagination.js" type="text/javascript"></script>
<script src="<?php echo ASSETS_URL; ?>/js/script/calendar/calendar_main.js"></script>
<script src="<?php echo ASSETS_URL; ?>/js/script/modal/modal_calendar.js"></script>