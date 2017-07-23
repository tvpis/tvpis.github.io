#!ruby

puts "loadImages(['" + Dir["*.jpg"].to_a.sort_by{|n| n.split(/ /).last.to_i }.join("', '") + "']);"
