#!ruby

puts "loadImages(['" + Dir["img/*.jpg"].to_a.map{|n| File.basename(n) }.sort_by{|n| n.split(/ /).last.to_i }.join("', '") + "']);"
