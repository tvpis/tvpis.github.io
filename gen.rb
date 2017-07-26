#!ruby
require "fileutils"
files = Dir["img/*.jpg"].to_a.map{|n| File.basename(n) }.sort_by{|n| n.split(/ /).last.to_i }
last = files.last.to_i
Dir["raw/src/*"].each do |raw|
    last += 1
    system("convert -resize 1920x1080 '%s' 'img/%d.jpg'" % [raw, last])
    FileUtils.mv(raw, "raw/done/")
    files << "#{last}.jpg"
end

puts "loadImages(['" + files.join("', '") + "']);"
