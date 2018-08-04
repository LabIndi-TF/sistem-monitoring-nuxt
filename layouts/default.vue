<template>
  <div>
    <b-navbar variant="faded" type="light" toggleable>
      <b-navbar-brand href="/" tag="h1" class="mb-0">IndiLabMonitoring</b-navbar-brand>
      <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
     <b-collapse is-nav id="nav_dropdown_collapse">
       <b-navbar-nav>
         <b-nav-item href="/">Home</b-nav-item>
<!--          <b-nav-item href="#">Link</b-nav-item>
         <b-nav-item-dropdown text="Lang" right>
           <b-dropdown-item href="#">EN</b-dropdown-item>
           <b-dropdown-item href="#">ES</b-dropdown-item>
           <b-dropdown-item href="#">RU</b-dropdown-item>
           <b-dropdown-item href="#">FA</b-dropdown-item>
         </b-nav-item-dropdown>
         <b-nav-item-dropdown text="User" right>
           <b-dropdown-item href="#">Account</b-dropdown-item>
           <b-dropdown-item href="#">Settings</b-dropdown-item>
         </b-nav-item-dropdown> -->
       </b-navbar-nav>
     </b-collapse>
    </b-navbar>

    <nuxt/>
  </div>
</template>

<style>

</style>
