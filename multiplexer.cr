email = "email"
len   = email.size 
max_bin_rep = Array(String).new 
email_chars = Array(String).new 

email.chop().each_char do |ch|
	max_bin_rep << "1" 
end 

email.each_char do |ch|
	email_chars << ch.to_s 
end 

maximum = max_bin_rep.join().to_i(2)

combinations = Array(String).new 

0.upto(maximum).each do |key|
	combinations << "%0#{len}b" % key
end

indexes = Array(Array(Int32)).new

combinations.each do |combination|
	seq = Array(Int32).new 
	combination.each_char do |ch|
		seq << ch.to_i
	end 
	indexes << seq 
end 

result = Array(String).new 

indexes.each do |index|
	temp = Array(String).new 
	
	email_chars.each_with_index do |ch, i|
		 
		if index[i] == 0
			temp << ch.to_s 
		else 
			temp << "." + ch.to_s 
		end
	end

	result << temp.join()

end

puts result 