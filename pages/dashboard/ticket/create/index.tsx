import DashboardLayout from "components/layouts/dashboard";
import Image from "next/image";
import receiveSquare from "public/images/receive-square.svg";

const Create = () => {
  return (
    <DashboardLayout>
      <div className="create">
        <h3 className="title">ثبت تیکت جدید</h3>
        <form className="content">
          <div>
            <div>
              <label htmlFor="categories">دسته بندی:</label>
              <select name="categories" id="categories"></select>
            </div>
            <div>
              <label htmlFor="part_type">نوع قطعه:</label>
              <select name="part_type" id="part_type"></select>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="accessories_type">نوع لوازم قطعه:</label>
              <select name="accessories_type" id="accessories_type"></select>
            </div>
            <div>
              <label htmlFor="name">نام کالا:</label>
              <input type="text" name="name" id="name" />
            </div>
          </div>
          <div>
            <label htmlFor="message">پیام:</label>
            <textarea
              name="message"
              id="message"
              // cols={30}
              rows={10}
            ></textarea>
          </div>
          <div>
            <label htmlFor="attached_file">فایل پیوست:</label>
            <div>
              <div>
                <button>
                  <Image src={receiveSquare} alt="receive-square" />
                  <span>آپلود فایل</span>
                </button>
                <input type="file" />
              </div>
              <span>پسوند های مجاز: .jpg, .gif, .jpeg, .png</span>
            </div>
          </div>
          <div>
            <button></button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Create;
