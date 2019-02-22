<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="pb-edit_header" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="pb-edit_header">Edit</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="pbe-errors" class="alert alert-danger d-none" role="alert"><ul class="m-0"></ul></div>
        <form>
          <div class="d-none" id="pbe-id"></div>
          <div class="form-group">
            <label for="pbe-first_name">First Name</label>
            <input type="text" name="first_name" class="form-control" id="pbe-first_name">
          </div>
          <div class="form-group">
            <label for="pbe-last_name">Last Name</label>
            <input type="text" name="last_name" class="form-control" id="pbe-last_name">
          </div>
          <div class="form-group">
            <label for="pbe-title">Title</label>
            <input type="text" name="title" class="form-control" id="pbe-title">
          </div>
          <div class="form-group">
            <label for="pbe-phone">Phone Number</label>
            <input type="text" name="phone" class="form-control" id="pbe-phone">
          </div>
          <div class="form-group">
            <label for="pbe-image">Avatar Image</label>
            <input type="file" name="image" class="custom-file-input" id="pbe-image" style="opacity: 1;">
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" id="pbe-submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
