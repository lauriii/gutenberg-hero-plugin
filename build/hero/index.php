<?php

function custom_plugin_hero_block_init() {
  register_block_type( __DIR__ );
}
add_action( 'init', 'custom_plugin_hero_block_init' );
