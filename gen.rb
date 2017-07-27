#!ruby
require "fileutils"
require "json"

files = Dir["img/*.jpg"].to_a.map{|n| File.basename(n) }.sort_by{|n| n.split(/ /).last.to_i }
last = files.last.to_i
data = JSON.parse(File.read("data.json"))
data.each do |row|
	row["id"] = row["id"].to_s.rjust(4, '0')
	row["img"] = row["id"] + ".jpg"
end

Dir["raw/src/*"].each do |raw|
    last += 1
    last_p = last.to_s.rjust(4, '0')
    system("convert -resize 1920x1080 '%s' 'img/%s.jpg'" % [raw, last_p])
    system("exiftool -all= 'img/%s.jpg'" % [last_p])
    system("open 'img/%s.jpg'" % [last_p])
    system("nano 'img/%s.md'" % [last_p])
    FileUtils.mv(raw, "raw/done/")
    files << "#{last_p}.jpg"
    data << {
        :id => last_p,
        :img => "#{last_p}.jpg",
        :text => File.read("img/#{last_p}.md").strip.gsub(/^title: /, "")
    }
end

File.open("data.json", "w") do |fp|
    fp.write JSON.pretty_generate(data)
end

