import java.io.IOException;
import java.util.StringTokenizer;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.GenericOptionsParser;

public class EarthQuakesPerDateMapper extends Mapper<LongWritable, Text, Text, IntWritable> {
  @Override
  protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
    if (key.get() > 0) {
      try {
        CSVParser parser = new CSVParser();
        String[] lines = parser.parseLine(value.toString());
        lines = new CSVParser().parseLine(lines[0]);
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmm");
        Date dt = formatter.parse(lines[0]);
        formatter.applyPattern("dd-MM-yyyy");
        String dtstr = formatter.format(dt);
        context.write(new Text(dtstr), new IntWritable(1));
      } catch (java.text.ParseException e) {

      }
    }
  }
}

public class EarthQuakesPerDateReducer extends Reducer<Text, IntWritable, Text, IntWritable> {
  @Override
  protected void reduce(Text key, Iterable<IntWritable> values, Context context) throws IOException, InterruptedException {
    int count = 0;
    for (IntWritable value : values) {
      count++;
    }
    context.write(key, new IntWritable(count));
  }
}

public class EarthQuakesPerDayJob {
  public static void main(String[] args) throws Throwable {
    Job job = new Job();
    job.setJarByClass(EarthQuakesPerDayJob.class);
    FileInputFormat.addInputPath(job, new Path(args[0]));
    FileOutputFormat.setOutputPath(job, new Path(args[1]));
    job.setMapperClass(EarthQuakesPerDateMapper.class);
    job.setReducerClass(EarthQuakesPerDateReducer.class);
    job.setOutputKeyClass(Text.class);
    job.setOutputValueClass(IntWritable.class);
    System.exit(job.waitForCompletion(true) ? 0 : 1);
  }
}

