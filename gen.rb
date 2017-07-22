#!ruby

puts "loadImages(['" + Dir["*.jpg"].to_a.shuffle.join("', '") + "']);"
